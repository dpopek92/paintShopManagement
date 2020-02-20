import React from "react";

const Manual = () => {
 return (
  <div className="manual">
   <h1 className="title--success title">Jak zamawiać?</h1>
   <ol>
    <li>
     <h3>Nowe zamówienie</h3>
     <p>
      Składanie <strong>nowego zamówienia</strong> możemy rozpocząć poprzez
      kliknięcie niebieskiego przycisku w menu:
     </p>
     <img
      className="big"
      src={require("../../images/manual/new.png")}
      alt="new"
     />
     <p>bądź wybór interesujących nas komponentów i przejście dalej:</p>
     <img
      className="big"
      src={require("../../images/manual/catalog1.png")}
      alt="new"
     />
     <img
      className="big"
      src={require("../../images/manual/catalog2.png")}
      alt="new"
     />
     <img
      className="big"
      src={require("../../images/manual/catalog3.png")}
      alt="new"
     />
    </li>
    <li>
     <h3>Formularz zamówienia</h3>
     <p>
      Formularz nowego zamówienia składa się z{" "}
      <span style={{ color: "green" }}>4 głównych części:</span>
     </p>
     <ul>
      <li>
       <h4>Podstawowe dane</h4>
       <p>
        Pola w tym panelu uzupełniane są automatycznie (data realizacji zmienia
        się zależnie od wybranych parametrów)
       </p>
       <img
        className="small"
        src={require("../../images/manual/form1.png")}
        alt="new"
       />
      </li>
      <li>
       <h4>Główne parametry zamówienia</h4>
       <p>
        W tym miejscu wybieramy{" "}
        <strong>
         <span style={{ color: "green" }}>kolor</span>, rodzaj uchwytu
        </strong>
        <small>(można wybrać dwa)</small>,
        <strong> typ frezowania i rodzaj witryny</strong>
       </p>
       <img
        className="small"
        src={require("../../images/manual/form2.png")}
        alt="new"
       />
       <p style={{ color: "red" }}>
        <small>Podanie koloru jest wymagane aby przejść dalej</small>
       </p>
      </li>
      <li>
       <h4>Nazwa i uwagi</h4>
       <p>
        W polu <strong>nazwa zamówienia </strong> można wpisać dowolną nazwę,
        np. nazwisko klienta, nazwę ulicy itp.{" "}
       </p>
       <p>
        W polu <strong>uwagi </strong> należy wpisać ważne informacje dotyczące
        całego zamówienia.
       </p>
       <img
        className="small"
        src={require("../../images/manual/form3.png")}
        alt="new"
       />
      </li>
      <li>
       <h4>Parametry zamawianych elementów</h4>
       <p>
        <strong>TYP</strong> - element gładki/frezowany/witryna{" "}
        <small>
         (aby wybrać element frezowany/witrynę należy wybrać rodzaj
         frezowania/witryny z katalogu lub w drugiej części formularza)
        </small>
       </p>
       <p>
        <strong>Wys./Szer.</strong> - wysokość i szerokość elementu
        <small style={{ color: "red" }}> (pozycje obowiązkowe)</small>
       </p>
       <p style={{ marginBottom: 0 }}>
        <strong>Krawędzie</strong> - kolorem{" "}
        <strong style={{ color: "#8dc63f" }}>zielonym</strong> zaznaczone są
        krawędzie prawej strony elementu,{" "}
        <strong style={{ color: "#ffb20d" }}>żółtych</strong> - lewej.
       </p>
       <p style={{ marginLeft: 15, fontSize: 16 }}>
        {"    "}Na <strong style={{ color: "#8dc63f" }}>zielonych</strong>{" "}
        krawędziach możemy wybrać interesujące nas wykończenie krawędzi, bądź
        uprzednio wybrany rodzaj uchwytu.
        <br />
        {"    "}Na <strong style={{ color: "#ffb20d" }}>żółtych</strong>{" "}
        krawędziach możemy wybrać interesujące nas wykończenie krawędzi, bądź
        ilość otworów na zawiasy.
       </p>
       <p>
        <strong>Grubość</strong> - grubość MDF (dla elementów frezowanych min.
        19mm, dla uchwytów frezowanych: 19mm/22mm)
       </p>
       <p>
        <strong>Ilość</strong> - ilość elementów o tych samych parametrach
       </p>
       <p>
        <strong>Lakierowane strony</strong> - strony elementu które mają zostać
        polakierowane
       </p>
       <p>
        <strong>Rysunek</strong> - przycisk umożliwiający dodanie rysunku
       </p>
       <p>
        <strong>Uwagi</strong> - uwagi/informacje do konkretnej pozycji
       </p>
       <p>
        <strong style={{ color: "#8e3434" }}>X</strong> - przycik do usunięcia
        pozycji
       </p>
       <img
        className="small"
        src={require("../../images/manual/form4.png")}
        alt="new"
       />
       <p>
        <strong>Dodaj</strong> - liczbę pozycji wpisanych w pasku obok, w
        przypadku braku wartości doda jedną pozycję
       </p>
       <img
        className="big"
        src={require("../../images/manual/form5.png")}
        alt="new"
       />
       <p>
        <strong style={{ color: "green" }}>Dalej</strong> - spowoduje przejście
        do podsumowania zamówienia
       </p>
      </li>
     </ul>
    </li>
   </ol>
  </div>
 );
};

export default Manual;
