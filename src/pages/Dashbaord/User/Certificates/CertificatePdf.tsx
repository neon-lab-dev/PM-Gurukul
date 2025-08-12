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
    fontWeight: "bold",
    color: "#0D3B66",
    textAlign: "center",
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
  },
  date: {
    position: "absolute",
    bottom: 95,
    left: 140,
    fontSize: 14,
    color: "#555555",
  },
});

interface CertificateProps {
  studentName: string;
  courseName: string;
  date: string;
}

export const CertificatePdf = ({
  studentName,
  courseName,
  date,
}: CertificateProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Background frame */}
      <Image src={certificateFrame} style={styles.frame} fixed />

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
