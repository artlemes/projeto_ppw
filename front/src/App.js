import Banner from "./components/Banner";
import Card from "./components/Card";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {  //renderiza 
  return (
    <>
      <Header></Header>
      <Banner></Banner>

      <Container>
        
      <h2>Categoria 1</h2>
      <section className="cards">
        <Card></Card> {/*depois passa os parametros pra mudar cada parte, etc., altera a função tambem pra receber*/}
        <Card></Card>
        <Card></Card>
      </section>

      <h2>Categoria 2</h2>
      <section className="cards">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </section>

      <h2>Categoria 3</h2>
      <section className="cards">
        <Card></Card> 
        <Card></Card>
        <Card></Card>
      </section>

      </Container>

      <Footer></Footer>
    </>
  );
}

export default App;
