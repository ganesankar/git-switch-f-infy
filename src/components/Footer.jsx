import { Box, Text } from "@primer/react";
import { GiPowerLightning } from "react-icons/gi";
import { PiGithubLogoBold } from "react-icons/pi";

export default function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "border.muted",
        fontSize: 1,
        py: 2,
        px: 4,
        textAlign: "center",
        justifyContent: "center",
      }}
    > <Text
    as="p"
    sx={{
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 0,
      pt: 2,
      gap: 1,
      color: "fg.muted",
      opacity: 0.8,
      m: 0,
    }}
  >
   
    Git &amp; GitHub-themed on purpose — a thank-you for a decade of
    commits.
  </Text>
  <Text
        as="p"
        sx={{
          fontSize: 0,
          gap: 1,
          color: "fg.muted",
          m: 0,
        }}
      >
        <Text as="span">© 2026 Ganesan Karuppaiya{" "}</Text>{" . "}
        <Text
        as="a" sx={{
          color: "fg.muted",
          textDecoration: "none",
          m: 0,
          "&:hover": {
            color: "fg.link",
            textDecoration: "underline",
          },
        }} href="https://git-scm.com/about" target="_blank" rel="noopener noreferrer">What is Git?</Text> {" . "}
        <Text
        as="a" sx={{
          color: "fg.muted",
          textDecoration: "none",
          m: 0,
          "&:hover": {
            color: "fg.link",
            textDecoration: "underline",
          },
        }} href="https://github.com/git-guides" target="_blank" rel="noopener noreferrer">What is Github?</Text>
      </Text>
      <Text
        as="p"
        sx={{
          color: "accent.fg",
          fontSize: 2,
          textDecoration: "none",
          mt: 1,
          "&:hover": {
            color: "accent.fg",
            textDecoration: "underline",
          },
        }}
      >
         
      </Text>
     
    </Box>
  );
}
