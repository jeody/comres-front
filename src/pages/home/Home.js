import './Home.scss';
import setBodyColor from '../../setBodyColor';

const Home = () => {
  // const { user } = useSelector((state) => state.auth);
  setBodyColor({ color: '#343a40' });
  return (
    <>
      <div className="home">
        <div className="container">
          <br />
          <br />
          <h1>Panuntunang Pansarili Ng Kawal Pilipino</h1>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Ako'y <b>Kawal Pilipino</b>, itataguyod ko at ipagsasanggalang and
            Saligang Batas ng Republika Ng Pilipinas.
          </p>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Ako'y <b>Kawal Pilipino</b>, babakahin ko ang anumang lakas na
            magtatangkang lumupig sa kalayaan at kasarinlan ng ating bansa.
          </p>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Ako'y <b>Kawal Pilipino</b>, susundin ko ang mga batas, kaatasan at
            mga utos na batay sa batas ng mga nakapangyayari sa akin.
          </p>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Ako'y <b>Kawal Pilipino</b>, lagi kong pananaigin ang pambansang
            kapangyarihan sa ibabaw ng Hukbong Sandatahan maging sa panahon ng
            digmaan o kapayapaan.
          </p>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Ako'y <b>Kawal Pilipino</b>, mabubuhay ako at mamatay sa tunay na
            diwa ng isang Pilipino, sa katungkulan, katapatan, katapangan, at
            karangalan sa paglilingkod sa bayan.
          </p>
          <br />
          <br />
          <p style={{ fontSize: '18px', color: '#000' }}>
            Sa lahat ng ito, panata kong iaalay ang aking buhay, ang aking
            kakayahan at ang aking karangalan.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
