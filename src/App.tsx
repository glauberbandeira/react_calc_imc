import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';

import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {

  // The value and Onchange precisam ser salvos em uma state.
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Preencha todos os campo");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>MC é a sigla para Índice de Massa Corporal. É uma medida internacional usada para verificar se uma pessoa está em seu peso ideal com base em sua altura e peso</p>
        
          <input
           type="number"
           placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
           value={heightField > 0 ? heightField : ''}
           onChange={e => setHeightField(parseFloat(e.target.value))}
           disabled={toShow ? true : false}
           />

          <input
           type="number"
           placeholder='Digite a seu peso. Ex: 75.5 (em kg)'
           value={weightField > 0 ? weightField : ''}
           onChange={e => setWeightField(parseFloat(e.target.value))}
           disabled={toShow ? true : false}
           />

           <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>

        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;