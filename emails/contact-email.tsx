import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New message from your portfolio</Heading>
          <Section style={section}>
            <Text style={label}>From</Text>
            <Text style={value}>
              {name} ({email})
            </Text>
            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>
            <Hr style={hr} />
            <Text style={label}>Message</Text>
            <Text style={value}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#050505", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "40px 24px", maxWidth: "560px" };
const heading = { color: "#ffffff", fontSize: "20px", fontWeight: 700 };
const section = {
  backgroundColor: "#0d1117",
  borderRadius: "16px",
  padding: "24px",
  marginTop: "16px",
};
const label = { color: "#9aa1ac", fontSize: "12px", marginBottom: "2px" };
const value = { color: "#f5f6f7", fontSize: "14px", marginTop: "0" };
const hr = { borderColor: "#1d2129", margin: "16px 0" };
