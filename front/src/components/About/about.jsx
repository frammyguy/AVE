import "./about.sass";

export default function About() {
    return (
        <div className="box about">
            <div className="about-wrap">
                <h1>Projekta dalībnieki:</h1>
                <h3>Aleksejs Dutkevičs</h3>
                <h3>Edāns Geļfands</h3>
                <h3>Vladislavs Fomins</h3>
            </div>
            <div className="about-wrap">
                <h2>Kopsavilkums par sistēmas funkcijām</h2>
                <p>Projekta AVE mērķis ir izglītot lietotājus par krusta kariem interaktīvā veidā, sniedzot tiem iespēju ne tikai gūt zināšanas, bet arī piedalīties mācību procesā caur spēlēšanu. Sistēma piedāvās vēsturisku ieskatu krusta karu notikumos, izmantojot kliķera (clicker) veida interfeisu, kur lietotāji var pakāpeniski atklāt jaunu informāciju par šo nozīmīgo vēstures periodu. Papildus pamatfunkcionalitātei, AVE iekļaus speciālas piedevas (perks), kas paātrinās zināšanu apguves procesu, padarot mācīšanos ne tikai izglītojošu, bet arī aizraujošu. </p>         
            </div>
            <div className="about-wrap">
                <h2>Saziņai:</h2>
                <p>Edans.Gelfands@edu.rtu.lv</p>
                <p>Vladislavs.Fomins@edu.rtu.lv</p>
                <p>Aleksejs.Dutkevics@edu.rtu.lv</p>
            </div>
        </div>
    )
}