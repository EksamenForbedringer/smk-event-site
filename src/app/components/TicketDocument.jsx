"use client";

import { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    paddingTop: 40,
    paddingRight: 40,
    paddingBottom: 40,
    paddingLeft: 0,
    fontSize: 10,
  },
  frame: {
    borderTop: "4 solid #800000",
    borderRight: "4 solid #800000",
    borderBottom: "4 solid #800000",
    padding: 20,
    paddingLeft: 40,
    width: "100%",
  },
  qrImage: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  column: {
    width: "48%",
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "700",
    marginTop: 6,
  },
  infoText: {
    marginBottom: 4,
    fontWeight: "400",
  },
});

const TicketDocument = ({ event, tickets, name, email }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    const generateQRCode = async () => {
      const bookingData = {
        eventTitle: event.title,
        name,
        email,
        tickets,
        eventId: event.id,
      };

      try {
        const url = await QRCode.toDataURL(JSON.stringify(bookingData));
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Kunne ikke generere QR-kode:", err);
      }
    };

    generateQRCode();
  }, [event, name, email, tickets]);

  if (!qrCodeUrl) return null;

  return (
    <Document>
      <Page
        size="A6"
        style={styles.page}
      >
        <View style={styles.frame}>
          <Text style={styles.title}>Event: {event.title}</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.infoLabel}>Navn:</Text>
              <Text style={styles.infoText}>{name}</Text>

              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>{email}</Text>

              <Text style={styles.infoLabel}>Lokation:</Text>
              <Text style={styles.infoText}>{event.location?.address}</Text>

              <Text style={styles.infoLabel}>Dato:</Text>
              <Text style={styles.infoText}>
                {new Date(event.date).toLocaleDateString("da-DK")}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.infoLabel}>Antal Billetter:</Text>
              <Text style={styles.infoText}>{tickets}x</Text>
            </View>
          </View>

          <Image
            style={styles.qrImage}
            src={qrCodeUrl}
          />
        </View>
      </Page>
    </Document>
  );
};

export default TicketDocument;
