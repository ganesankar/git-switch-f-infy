import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeProvider, BaseStyles, Box, Heading, Text } from "@primer/react";
import { DeviceDesktopIcon } from "@primer/octicons-react";
import { Toaster } from "react-hot-toast";

import { site, TAB_IDS } from "./site.config.js";
import { getConversation } from "./lib/conversation.js";
import { getFiles } from "./lib/files.js";
import { commits } from "./content/commits/commits.js";
import { checks } from "./content/checks/checks.js";

import TopBar from "./components/TopBar.jsx";
import RepoNav from "./components/RepoNav.jsx";
import PrHeader from "./components/PrHeader.jsx";
import PrSubNav from "./components/PrSubNav.jsx";
import ConversationView from "./components/ConversationView.jsx";
import CommitsView from "./components/CommitsView.jsx";
import ChecksView from "./components/ChecksView.jsx";
import FilesChangedView from "./components/FilesChangedView.jsx";
import Sidebar from "./components/Sidebar.jsx";
import FloatingCat from "./components/FloatingCat.jsx";
import Footer from "./components/Footer.jsx";

const SMALL_SCREEN_BREAKPOINT = 800;

function useIsSmallScreen() {
  const getMatch = () =>
    typeof window !== "undefined" &&
    window.innerWidth < SMALL_SCREEN_BREAKPOINT;

  const [isSmall, setIsSmall] = useState(getMatch);

  useEffect(() => {
    const onResize = () => setIsSmall(getMatch());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isSmall;
}

export default function App() {
  const conversation = useMemo(() => getConversation(), []);
  const files = useMemo(() => getFiles(), []);
  const [activeTab, setActiveTab] = useState(TAB_IDS.conversation);
  const isSmallScreen = useIsSmallScreen();
  const footerRef = useRef(null);

  const counts = {
    [TAB_IDS.conversation]: conversation.length,
    [TAB_IDS.commits]: commits.length,
    [TAB_IDS.checks]: checks.length,
    [TAB_IDS.files]: files.length,
  };

  const showSidebar = activeTab === TAB_IDS.conversation;

  function handleSubmitReview() {
    setActiveTab(TAB_IDS.conversation);
    // Defer until the conversation tab has rendered the comment section.
    requestAnimationFrame(() => {
      const el = document.getElementById('comment-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <ThemeProvider colorMode="light" preventSSRMismatch>
      <BaseStyles>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#1f2328",
              border: "1px solid #d1d9e0",
              borderRadius: "6px",
              fontSize: "14px",
              padding: "10px 16px",
              boxShadow: "0 8px 24px rgba(140, 149, 159, 0.2)",
              maxWidth: 460,
            },
          }}
        />
        <Box sx={{ minHeight: "100vh", bg: "canvas.default" }}>
          <TopBar
            owner={site.owner}
            repo={site.repo}
            visibility={site.visibility}
          />
          <RepoNav />
          <PrHeader
            title={site.prTitle}
            titleEmoji={site.prTitleEmoji}
            number={site.prNumber}
            status={site.prStatus}
            baseBranch={site.baseBranch}
            headBranch={site.headBranch}
            authorName={site.defaultAuthor.name}
            authorHandle={site.defaultAuthor.handle}
            commitsLabel={site.commitsLabel}
            onSubmitReview={handleSubmitReview}
          />

          <PrSubNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          <Box sx={{ minWidth: 0 , maxWidth: 1280,  mx: "auto",   px: 4,
                  pt: 3,
                  pb: 5,}}>
            {activeTab === TAB_IDS.conversation && (
              <Box
                sx={{
                  
                 
                
                  display: "grid",
                  gridTemplateColumns: showSidebar
                    ? ["1fr", "1fr", "minmax(0, 1fr) 296px"]
                    : "minmax(0, 1fr)",
                  gap: 4,
                }}
              >
               <div>
               <ConversationView
                  posts={conversation}
                  author={site.defaultAuthor}
                  mergeRows={site.mergeBox.rows}
                />
               </div>
                {showSidebar && (
                  <Box sx={{ display: ["none", "none", "block"] }}>
                    <Sidebar milestone={site.prNumber} />
                  </Box>
                )}
              </Box>
            )}
            {activeTab === TAB_IDS.commits && (
              <CommitsView commits={commits} author={site.defaultAuthor} />
            )}
            {activeTab === TAB_IDS.checks && <ChecksView checks={checks} />}
            {activeTab === TAB_IDS.files && <FilesChangedView files={files} />}
          </Box>
        </Box>

        <div ref={footerRef}>
          <Footer />
        </div>
        {!isSmallScreen && <FloatingCat footerRef={footerRef} />}

        {isSmallScreen && (
          <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby="small-screen-overlay-title"
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              bg: "rgba(13, 17, 23, 0.72)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Box
              sx={{
                bg: "canvas.default",
                color: "fg.default",
                border: "1px solid",
                borderColor: "border.default",
                borderRadius: 2,
                boxShadow: "shadow.large",
                maxWidth: 420,
                width: "100%",
                p: 4,
                textAlign: "center",
              }}
            >
              <Box sx={{ color: "accent.fg", mb: 3 }}>
                <DeviceDesktopIcon size={32} />
              </Box>
              <Heading
                as="h2"
                id="small-screen-overlay-title"
                sx={{ fontSize: 3, mb: 2 }}
              >
                git checkout --bigger-screen
              </Heading>
              <Text as="p" sx={{ color: "fg.muted", fontSize: 1, m: 0 }}>
                Yes, I'm designer by trade &mdash; but, this isn&apos;t a design
                portfolio. It&apos;s a decade of a developer&apos;s life,
                shipped the only way he knows how: as a pull request. Reviewing
                a career on a {window.innerWidth}px screen is{" "}
                <Box as="code" sx={{ fontFamily: "mono", fontSize: 0 }}>
                  fatal: viewport too shallow
                </Box>
                . Pull it up on a tablet or desktop ({SMALL_SCREEN_BREAKPOINT}
                px+). The diffs deserve it.
              </Text>
            </Box>
          </Box>
        )}
      </BaseStyles>
    </ThemeProvider>
  );
}
