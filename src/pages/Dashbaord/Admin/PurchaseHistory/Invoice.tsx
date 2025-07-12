/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { TOrders } from "./PurchaseHistory";
import logo from "../../../../assets/Images/pm-gurukul.png";
import rupee from "../../../../assets/Icons/rupee.png";
import { formatDate } from "../../../../utils/formatDate";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, position: "relative" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: { width: 200, height: 60 },
  rupee: { width: 6, height: 6 },
  address: { textAlign: "right", fontSize: 10 },
  section: {
    marginBottom: 10,
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 6,
  },
  section2: { marginBottom: 10 },
  boldText: { fontWeight: "bold", color: "black" }, // Black bold titles
  normalText: { color: "#4F4F4F" }, // Gray normal text
  table: { width: "100%", marginTop: 10, borderWidth: 1, borderColor: "#ccc" },
  tableRow: {
    borderRight: 2, // This seems unusual, typically borderRight would be on cells, not row. Assuming it's meant for overall table border effect or a typo and should be borderWidth.
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  rowFontSize: {
    fontSize: 10,
  },
  tableCell: { flex: 1, padding: 5, textAlign: "center" },
  cellWithBorder: {
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: { backgroundColor: "#f2f2f2", fontWeight: "bold" },
  declarationRow: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 10,
    textAlign: "center",
  },
  footerDetails: { marginTop: 20, alignItems: "center" },
  clickableLink: {
    textAlign: "center",
    fontSize: 10,
    color: "blue",
    textDecoration: "underline",
    position: "absolute",
    bottom: 10,
    left: 30,
  },
  statusCard: {
    backgroundColor: "#25D366",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

const Invoice = ({
  order,
  companyDetails,
}: {
  order: TOrders;
  companyDetails?: any;
}) => {
  const gstAmount = order?.totalPrice
    ? (order.totalPrice * Number(order?.gst)) / (100 + Number(order?.gst))
    : 0;
  if (!order || !order._id) {
    return <Text>Invalid Order</Text>;
  }

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.address}>
            <Text style={{ marginTop: 2 }}>
              PMGURUKKUL EDTECH MARKETING LLP
            </Text>
            <Text style={{ marginTop: 2 }}>
              Address: 2/79, Geeta Colony, Delhi-110031,India,
            </Text>
            <Text style={{ marginTop: 2 }}>GSTIN: 07ABHFP1767D1Z8,</Text>
            <Text style={{ marginTop: 2 }}>State Name: Delhi, Code: 07,</Text>
            <Text style={{ marginTop: 2 }}>PAN: ABHFP1767D</Text>
          </View>
        </View>

        {/* Invoice Details Section */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.boldText}>Invoice#:</Text>
            <Text style={styles.normalText}> {order.paymentId}</Text>
          </Text>
          <Text style={{ marginTop: 5 }}>
            <Text style={styles.boldText}>Invoice Date:</Text>
            <Text style={styles.normalText}>
              {" "}
              {formatDate(order.createdAt)}
            </Text>
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
          >
            <Text style={styles.boldText}>Status:</Text>
            <Text style={styles.statusCard}>PAID</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 10,
            gap: 30,

            width: "100%", // or any fixed width or % that suits your design
          }}
        >
          {/* Invoiced To Section */}
          <View style={{ flex: 1 }}>
            <Text style={styles.boldText}>Invoiced To:</Text>
            <View style={{ marginTop: 5 }}>
              <Text>
                <Text style={styles.boldText}>Name:</Text>
                <Text style={styles.normalText}> {order?.user?.full_name}</Text>
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                <Text style={styles.boldText}>Mobile Number:</Text>
                <Text style={styles.normalText}>
                  {" "}
                  {order?.user?.mobileNumber}
                </Text>
              </Text>
            </View>
          </View>

          {/* GST details */}
           <View
              style={{
                alignSelf: "flex-start",
              }}
            >
              <Text style={styles.boldText}>GST Information:</Text>
              <View style={{ marginTop: 5 }}>
                <Text>
                  <Text style={styles.boldText}>GST Company Name:</Text>
                  <Text style={styles.normalText}>
                    {" "}
                    {companyDetails?.gstCompanyName || "N/A"}
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>
                  <Text style={styles.boldText}>GST Number:</Text>
                  <Text style={styles.normalText}>
                    {" "}
                    {companyDetails?.gstNumber || "N/A"}
                  </Text>
                </Text>
              </View>
            </View>
        </View>

        {/* Course Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellWithBorder]}>
              Description
            </Text>
            <Text style={[styles.tableCell, styles.cellWithBorder]}>Qty</Text>
            <Text style={[styles.tableCell, styles.cellWithBorder]}>
              HSN/SAC
            </Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>

          {/* Course Details */}
          {order?.course?.map((course: any) => (
            <View
              key={course?._id}
              style={[styles.tableRow, styles.rowFontSize]}
            >
              <Text style={[styles.tableCell, styles.cellWithBorder]}>
                {course?.title}
              </Text>
              <Text style={[styles.tableCell, styles.cellWithBorder]}>1</Text>
              <Text style={[styles.tableCell, styles.cellWithBorder]}>
                999293
              </Text>
              <Text style={styles.tableCell}>
                <Image src={rupee} style={styles.rupee} />
                {order?.discountedPrice}
              </Text>
            </View>
          ))}

          {/* Subtotal */}
          <View style={[styles.tableRow, styles.rowFontSize]}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text
              style={[
                styles.tableCell,
                styles.cellWithBorder,
                { textAlign: "right", fontWeight: "bold", marginRight: -1 },
              ]}
            >
              Sub Total:
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              <Image src={rupee} style={styles.rupee} />
              {order?.discountedPrice}
            </Text>
          </View>

          {/* Tax Row - MODIFIED SECTION */}
          <View style={[styles.tableRow, styles.rowFontSize]}>
            {/* Cell 1: Corresponds to 'Description' column. Takes 1/4 of width (flex: 2 out of 8 total) */}
            <Text
              style={[styles.tableCell, styles.cellWithBorder, { fontSize: 9 }]}
            >
              Tax {order?.gst}%:
            </Text>

            {/* Cells 2-5: Correspond to 'Qty' and 'HSN/SAC' columns. Each takes 1/8 of width (flex: 1 out of 8 total) */}
            <Text
              style={[styles.tableCell, styles.cellWithBorder, { fontSize: 9 }]}
            >
              CGST: 9%
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.cellWithBorder,
                { flex: 2, fontSize: 9 },
              ]}
            >
              CGST Amt: {gstAmount / 2}
            </Text>
            <Text
              style={[styles.tableCell, styles.cellWithBorder, { fontSize: 9 }]}
            >
              SGST: 9%
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.cellWithBorder,
                { flex: 2, fontSize: 9 },
              ]}
            >
              SGST Amt: {gstAmount / 2}
            </Text>

            {/* Cell 6: Corresponds to 'Amount' column. Takes 1/4 of width (flex: 2 out of 8 total). No right border. */}
            <Text style={[styles.tableCell, { fontWeight: "bold", flex: 2 }]}>
              <Image src={rupee} style={styles.rupee} />
              {gstAmount.toFixed(2)}
            </Text>
          </View>
          {/* END OF MODIFIED SECTION */}

          {/* Total */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { textAlign: "right" }]}></Text>
            <Text style={styles.tableCell}></Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "right", fontWeight: "bold" },
              ]}
            >
              Total:
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              <Image src={rupee} style={styles.rupee} />
              {order?.totalPrice}
            </Text>
          </View>
        </View>

        {/* Declaration Section */}
        <View style={styles.table}>
          <Text style={styles.declarationRow}>
            Declaration: We declare that this invoice shows the actual price of
            the goods/services described and that all particulars are true and
            correct.
          </Text>
          <Text style={[styles.declarationRow, { fontWeight: "bold" }]}>
            This is a Computer Generated Invoice No Signature Required.
          </Text>
        </View>

        {/* Footer Section */}
        <Text style={styles.clickableLink}>www.pmgurukkul.com</Text>
        <View style={styles.footerDetails}>
          <Text>Generated on {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
