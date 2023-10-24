import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IShop, ITransaction } from "../interface";

const calculateTotalPrice = (transaction: ITransaction) => {
  let totalPrice = 0;

  for (const product of transaction?.products) {
    // Assuming you have properties: unit_price, quantity, and discount
    const unitPrice = product?.unitPrice;
    const quantity = product?.quantity;
    const discount = product?.discount;

    if (!isNaN(unitPrice) && !isNaN(quantity) && !isNaN(discount)) {
      // Calculate the total price for the product
      const productTotal = unitPrice * quantity - discount;

      // Add the product total to the overall total
      totalPrice += productTotal;
    }
  }

  return totalPrice;
};

export const generatePurchageOrder = (
  shop: IShop,
  transection: ITransaction,
  menufectureData: { name: string; address: string }
) => {
  const doc = new jsPDF();

  // Sample data
  const purchaseOrder = {
    orderNumber: transection?.orderId,
    trackingId: transection?.trackId,
    customerInfo: {
      name: `${shop?.shopName} - ${shop?.ownerName}`,
      address: shop?.location?.address,
      mobile: shop?.mobileNumber,
    },
    shippingInfo: {
      name: shop?.shipping?.reciverName,
      address: shop?.shipping?.address,
      mobile: shop?.shipping?.mobileNumber,
    },
    companyInfo: {
      name: menufectureData?.name,
      address: menufectureData?.address,
    },
    products: [...transection?.products],
  };

  // Add an image (replace 'imageURL' with the actual image URL)
  const imageURL =
    "https://res.cloudinary.com/emerging-it/image/upload/v1690594985/demo-task/GrowB/logo_v6uhgm.png";
  doc.addImage(imageURL, "JPEG", 10, 5, 32, 32);

  // Add customer and shipping information
  doc.setFontSize(14);
  doc.setFont("roboto", "bold");
  doc.text(`Customer Information:`, 15, 40);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(`Name: ${purchaseOrder.customerInfo.name}`, 15, 45);
  doc.text(`Address: ${purchaseOrder.customerInfo.address}`, 15, 50);
  doc.text(`Mobile Number: ${purchaseOrder.customerInfo.mobile}`, 15, 55);

  doc.setFontSize(14);
  doc.setFont("roboto", "bold");
  doc.text(`Delivery Information:`, 15, 65);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(`Name: ${purchaseOrder.shippingInfo.name}`, 15, 70);
  doc.setFontSize(10);
  doc.text(`Address: ${purchaseOrder.shippingInfo.address}`, 15, 75);
  doc.setFontSize(10);
  doc.text(`Mobile: ${purchaseOrder.shippingInfo.mobile}`, 15, 80);

  // Add company information
  doc.setFontSize(14);
  doc.setFont("roboto", "bold");
  doc.text(`Company Information:`, 120, 40);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(`Name: ${purchaseOrder.companyInfo.name}`, 120, 45);
  doc.text(`Address: ${purchaseOrder.companyInfo.address}`, 120, 50);

  // Purchase Order Number and Tracking ID
  doc.setFontSize(15);
  doc.text("Purchase Order", 15, 90);
  doc.setFontSize(15);
  doc.text(`Order Number: ${purchaseOrder.orderNumber}`, 15, 100);
  doc.text(`Tracking ID: ${purchaseOrder.trackingId}`, 15, 110);

  //order type
  const col = [
    "Purchase Representative",
    "Payment Status",
    "Order Date",
    "Product Category",
  ];

  const list = [
    [
      "Seller Portal",
      "Credit 30 Days",
      !!transection?.date
        ? transection?.date
        : `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      "Shoes",
    ],
  ];

  // Product list table
  const columns = [
    "SL NO.",
    "Product Name",
    "Variant",
    "Quantity",
    "Price",
    "Discount",
    "Total(৳)",
  ];
  const data = purchaseOrder.products.map((product, index) => [
    index + 1,
    product.name,
    product.variant,
    product.quantity,
    `${product.unitPrice.toFixed(2)}`,
    `${!!product.discount ? product.discount.toFixed(2) : "0.00"}`,
    `${(
      product.quantity * product.unitPrice -
      (!!product.discount ? product.discount : 0)
    ).toFixed(2)}`,
  ]);

  // Add an empty row to separate the products and the subtotal
  data.push(["", "", "", "", "", "", ""]);

  // Calculate the sum of all prices
  const totalPrice = calculateTotalPrice(transection);

  //discount row
  const discountRow = [
    "",
    "",
    "",
    "",
    "",
    "Discount",
    `${
      !!transection?.totalDiscount
        ? transection.totalDiscount.toFixed(2)
        : "0.00"
    }`,
  ];
  data.push(discountRow);
  // Subtotal row
  const subtotalRow = [
    "",
    "",
    "",
    "",
    "",
    "Subtotal",
    `${(
      totalPrice -
      (!!transection?.totalDiscount ? transection?.totalDiscount : 0)
    ).toFixed(2)}`,
  ];
  data.push(subtotalRow);

  console.log(data);

  autoTable(doc, {
    startY: 120,
    head: [col],
    body: list,
    theme: "plain",
    styles: { halign: "left" },
  });

  autoTable(doc, {
    startY: 140,
    head: [columns],
    body: data,
    theme: "striped",
    horizontalPageBreak: true,
    styles: { halign: "left" },
  });

  // Add your copyright text to every page
  const copyrightText =
    "© +88-01322075679 info@growb.xyz http://www.growb.xyz H-29, R-1/C, Nikunja-2, Dhaka-1229";

  // Add a footer with the copyright text on every page
  const totalPages = doc.internal.pages?.length - 1;

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);

    // Add a black line
    doc.setDrawColor(0); // 0 for black
    doc.setLineWidth(0.2); // Adjust the line width as needed
    doc.line(
      10,
      doc.internal.pageSize.height - 15,
      200,
      doc.internal.pageSize.height - 15
    ); // Adjust the line's coordinates

    doc.text(copyrightText, 35, doc.internal.pageSize.height - 10);
    doc.text(`${i}/${totalPages}`, 190, doc.internal.pageSize.height - 10);
  }

  // Save the PDF or open it in a new tab
  doc.save(`PurchaseOrder-${transection?.orderId}.pdf`);
};

export const generateInvoice = (
  shop: IShop,
  transection: ITransaction,
  shippingCost: number = 0
) => {
  const doc = new jsPDF();

  // Sample data
  const purchaseOrder = {
    orderNumber: transection?.orderId,
    trackingId: transection?.trackId,
    customerInfo: {
      name: `${shop?.shopName} - ${shop?.ownerName}`,
      address: shop?.location?.address,
      mobile: shop?.mobileNumber,
    },
    orderStatus: "Drop_to_transport",
    shippingInfo: {
      name: shop?.shipping?.reciverName,
      address: shop?.shipping?.address,
      mobile: shop?.shipping?.mobileNumber,
    },
    companyInfo: {
      name: "Growb",
      address: "Road #1/C House #29 Nikunja-2, Khilkhet, Dhaka",
    },
    products: [...transection?.products],
  };

  // Add an image (replace 'imageURL' with the actual image URL)
  const imageURL =
    "https://res.cloudinary.com/emerging-it/image/upload/v1690594985/demo-task/GrowB/logo_v6uhgm.png";
  doc.addImage(imageURL, "JPEG", 10, 5, 32, 32);

  // Add customer and shipping information

  // doc.setFontSize(14);
  // doc.setFont("roboto", "bold");
  // doc.text(`Customer Information:`, 10, 40);
  doc.setFontSize(12);
  doc.setFont("roboto", "normal");
  doc.text(`${shop?.shopName}`, 15, 35);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(` ${purchaseOrder.customerInfo.mobile}`, 15, 42);

  doc.setFontSize(12);
  doc.setFont("roboto", "normal");
  doc.text(`Billing Information:`, 15, 70);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(`Name: ${purchaseOrder.customerInfo.name}`, 15, 75);
  doc.text(`Address: ${purchaseOrder.customerInfo.address}`, 15, 80);
  doc.text(`Mobile Number: ${purchaseOrder.customerInfo.mobile}`, 15, 85);

  doc.text(`Payment Method: Credit 15 Days`, 15, 95);

  doc.setFontSize(12);
  doc.setFont("roboto", "normal");
  doc.text(`Shipping Information:`, 120, 70);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(`Name: ${purchaseOrder.shippingInfo.name}`, 120, 75);
  doc.setFontSize(10);
  doc.text(`Address: ${purchaseOrder.shippingInfo.address}`, 120, 80);
  doc.setFontSize(10);
  doc.text(`Mobile: ${purchaseOrder.shippingInfo.mobile}`, 120, 85);

  // Add company information
  doc.setFontSize(17);
  doc.setFont("roboto", "bold");
  doc.text(`Invoice`, 120, 20);
  doc.setFontSize(10);
  doc.setFont("roboto", "normal");
  doc.text(
    `Order Date: ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    120,
    30
  );
  doc.text(`Order ID: ${purchaseOrder.orderNumber}`, 120, 36);
  doc.text(`Tracking ID: ${purchaseOrder.trackingId}`, 120, 42);
  doc.text(`Product Category: Shoes`, 120, 48);

  // Product list table
  const columns = [
    "SL NO.",
    "Description",
    "Article",
    "Qty(Pair)",
    "Price",
    "Discount",
    "Total(৳)",
  ];
  const data = purchaseOrder.products.map((product, index) => {
    const increasedUnitPrice = product.unitPrice * 1.05; // Increase unit price by 5%
    const totalPerProduct =
      product.quantity * increasedUnitPrice -
      (!!product.discount ? product.discount : 0);

    return [
      index + 1,
      product.name,
      product.variant,
      product.quantity,
      `${increasedUnitPrice.toFixed(2)}`,
      `${!!product.discount ? product.discount.toFixed(2) : "0.00"}`,
      `${totalPerProduct.toFixed(2)}`,
    ];
  });

  // Calculate the total price by summing up the total of each product
  const totalPrice = data.reduce((accumulator, product) => {
    return accumulator + Number(product[6]);
  }, 0);

  // Add an empty row to separate the products and the subtotal
  data.push(["", "", "", "", "", "", ""]);

  const dataV2 = [];

  //discount row

  const totalRow = [
    { colSpan: 5, content: "" },
    { content: "Total" },
    {
      content: `${totalPrice.toFixed(2)}`,
    },
  ];

  //discount row
  const discountRow = [
    { colSpan: 5, content: "" },
    { content: "Discount (-)" },
    {
      content: `${
        !!transection?.totalDiscount
          ? transection.totalDiscount.toFixed(2)
          : "0.00"
      }`,
    },
  ];

  //tax row
  const taxRow = [
    { colSpan: 5, content: "" },
    { content: "Tax" },
    {
      content: `0.00`,
    },
  ];

  //shipping cost row
  const shippingCostRow = [
    { colSpan: 5, content: "" },
    { content: "Shipping Cost (+)" },
    {
      content: shippingCost,
    },
  ];

  // Subtotal row
  const subtotalRow = [
    { colSpan: 5, content: "" },
    { content: "SubTotal" },
    {
      content: `${(
        totalPrice +
        shippingCost -
        (!!transection?.totalDiscount ? transection?.totalDiscount : 0)
      ).toFixed(2)}`,
    },
  ];

  dataV2.push(totalRow);
  dataV2.push(taxRow);

  dataV2.push(shippingCostRow);
  dataV2.push(discountRow);
  dataV2.push(subtotalRow);

  autoTable(doc, {
    startY: 100,
    head: [columns],
    body: [...data, ...dataV2],
    theme: "grid",
    horizontalPageBreak: true,
    styles: { halign: "left", overflow: "linebreak" },
  });

  // Add your copyright text to every page
  const copyrightText =
    "© +88-01322075679 info@growb.xyz http://www.growb.xyz H-29, R-1/C, Nikunja-2, Dhaka-1229";

  // Add a footer with the copyright text on every page
  const totalPages = doc.internal.pages?.length - 1;

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);

    // Add a black line
    doc.setDrawColor(0); // 0 for black
    doc.setLineWidth(0.2); // Adjust the line width as needed
    doc.line(
      10,
      doc.internal.pageSize.height - 15,
      200,
      doc.internal.pageSize.height - 15
    ); // Adjust the line's coordinates

    doc.text(copyrightText, 35, doc.internal.pageSize.height - 10);
    doc.text(`${i}/${totalPages}`, 190, doc.internal.pageSize.height - 10);
  }

  // Save the PDF or open it in a new tab
  doc.save(`invoice-${transection?.orderId}.pdf`);
};
