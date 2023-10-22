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

  return (totalPrice - transaction?.totalDiscount).toFixed(2);
};

export const generatePurchageOrder = (
  shop: IShop,
  transection: ITransaction
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
      name: "Growb",
      address: "Road #1/c House #29 Nikunja-2, Khilkhet, Dhaka",
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
    "Total",
  ];
  const data = purchaseOrder.products.map((product, index) => [
    index + 1,
    product.name,
    product.quantity,
    `$${product.unitPrice.toFixed(2)}`,
    `$${!!product.discount ? product.discount.toFixed(2) : "0.00"}`,
    `$${(product.quantity * product.unitPrice - product?.discount).toFixed(2)}`,
  ]);

  // Add an empty row to separate the products and the subtotal
  data.push(["", "", "", "", "", ""]);

  // Calculate the sum of all prices
  const totalPrice = calculateTotalPrice(transection);

  //discount row
  const discountRow = [
    "",
    "",
    "",
    "",
    "Discount",
    `$${
      !!transection?.totalDiscount
        ? transection.totalDiscount.toFixed(2)
        : "0.00"
    }`,
  ];
  data.push(discountRow);
  // Subtotal row
  const subtotalRow = ["", "", "", "", "Subtotal", `$${totalPrice}`];
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
    styles: { halign: "center" },
  });

  // Save the PDF or open it in a new tab
  doc.save(`PurchaseOrder-${transection?.orderId}.pdf`);
};
