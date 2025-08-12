import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import certificateFrame from "../../../../assets/Images/certificate-frame.png";
import timesNewRoman from "../../../../assets/Fonts/times.ttf";

// Register font once globally
Font.register({
  family: "Times New Roman",
  src: timesNewRoman,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    position: "relative",
    fontFamily: "Times New Roman",
  },
  frame: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  studentNameContainer: {
    position: "absolute",
    top: 255,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  studentName: {
    fontSize: 32,
    fontWeight: 900,
    color: "#0D3B66",
    textAlign: "center",
    fontFamily: "Times New Roman",
  },
  courseNameContainer: {
    position: "absolute",
    top: 355,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  courseName: {
    fontSize: 18,
    color: "#0D3B66",
    fontFamily: "Times New Roman",
  },
  certificateId: {
    position: "absolute",
    top: 70,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    color: "#0D3B66",
    fontFamily: "Times New Roman",
  },

  date: {
    position: "absolute",
    bottom: 95,
    left: 140,
    fontSize: 14,
    color: "#555555",
    fontFamily: "Times New Roman",
  },
});

interface CertificateProps {
  certificateId: string;
  studentName: string;
  courseName: string;
  date: string;
}

export const CertificatePdf = ({
  certificateId,
  studentName,
  courseName,
  date,
}: CertificateProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Background frame */}
      <Image src={certificateFrame} style={styles.frame} fixed />

      <Text style={styles.certificateId}>Certificate ID: {certificateId}</Text>

      <View style={styles.studentNameContainer}>
        <Text style={styles.studentName}>{studentName}</Text>
      </View>
      <View style={styles.courseNameContainer}>
        <Text style={styles.courseName}>{courseName}</Text>
      </View>

      <Text style={styles.date}>{date}</Text>
    </Page>
  </Document>
);
