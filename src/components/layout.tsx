import Footer from "./footer";
import Header from "./header"


export default function Layout({ children }) {
  return (
    <div style={{"display": "flex", "flexDirection": "column", "minHeight": "100vh"}}>
      <Header/>
      <main style={{"flexGrow": 1, "display": "flex", "flexDirection": "column"}}>{children}</main>
      <Footer/>
    </div>
  );
}