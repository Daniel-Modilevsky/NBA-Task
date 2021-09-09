import React from "react";
import TransferList from "../layout/transferList"
type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          height: "92%",
          width: "100%",
          position: "fixed",
          backgroundColor: "#f4f6f8",
        }}
      >
        <main
          className="container__main"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
          }}
        >
          <aside className="container__left" style={{ width: "20%" }}>
            <img
              src={
                "https://coolwallpapers.me/picsup/5538347-basketball-wallpapers.jpg"
              }
              style={{ width: "500%", height: "100%" }}
              alt={"left"}
            />
          </aside>

          <article
            className="container__middle"
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              height: "90%",
              marginTop: "2%",
              backgroundColor: "white",
              boxShadow:
                "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
            }}
          >
            <TransferList/>
          </article>

          <nav className="container__right" style={{ width: "20%" }}></nav>
        </main>
      </div>
    </>
  );
};

export default HomeScreen;

HomeScreen.defaultProps = {};
