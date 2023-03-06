import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ marginTop: "60px" }}>{children}</main>
    </>
  );
}
