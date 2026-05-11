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
        color: "fg.muted",
        fontSize: 1,
        py: 2,
        px: 4,
        textAlign: "center",
        justifyContent: "center",
      }}
    >



      <Text sx={{ textAlign: "left" }}>
        <Text>© 2026 Ganesan Karuppaiya </Text><br />

        <Text
          as="a"
          sx={{
            color: "fg.default",
            textDecoration: "none",
            "&:hover": {
              color: "fg.default",
              textDecoration: "underline",
            },
          }}
          href="https://interestingtamilpoems.blogspot.com/2014/10/blog-post_43.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GiPowerLightning /> நற்றுணையாவது  நமச்சிவாயவே <GiPowerLightning />
        </Text>
      </Text> <br />


      <PiGithubLogoBold /><Text>GitHub-themed on purpose — a thank-you for a decade of commits.</Text>

    </Box>
  );
}
