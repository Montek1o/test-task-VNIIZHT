import { FC, useEffect, useState } from "react";
import { ICharacteristics } from "../../types/ITrain";
import './CharacteristicsItem.css';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { characteristicsSlice } from "../../store/reducers/CharSlice";
import { useParams } from "react-router-dom";

interface CharacteristicsItemProp {
  char: ICharacteristics;
  index: number;
}

const CharacteristicsItem: FC<CharacteristicsItemProp> = ({ char, index }) => {
  const dispatch = useAppDispatch();
  const { currentChar } = useAppSelector(state => state.charReducer);
  const [edit, setEdit] = useState(false);
  const [chars, setChars] = useState({
    engineAmperage: char.engineAmperage, 
    force: char.force, 
    speed: char.speed
  });
  const [errorChars, setErrorChars] = useState({
    engineAmperage: false,
    force: false, 
    speed: false
  })
  
  useEffect(() => {
    if (currentChar === index) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [currentChar])
  
  useEffect(() => {
    if (errorChars.engineAmperage || errorChars.force || errorChars.speed ) {
      dispatch(characteristicsSlice.actions.charNoValid())
    } else {
      dispatch(characteristicsSlice.actions.charValid())
    }
  }, [errorChars])


  function onChangeEngine(e: React.ChangeEvent<HTMLInputElement>) {
    const reg = /^\d+$/;
    if (reg.test(e.target.value)) {
      setErrorChars({...errorChars, engineAmperage: false})
    } else {
      setErrorChars({...errorChars, engineAmperage: true})
    }
    setChars({...chars, engineAmperage: e.target.value as unknown as number})
    dispatch(characteristicsSlice.actions.charUpdate({...char, engineAmperage: +e.target.value}))
  }

  function onChangeForce(e: React.ChangeEvent<HTMLInputElement>) {
    const reg = /^\d+(\.\d+)?$/;
    if (reg.test(e.target.value)) {
      setErrorChars({...errorChars, force: false})
    } else {
      setErrorChars({...errorChars, force: true})
    }
    setChars({...chars, force: e.target.value as unknown as number})
    dispatch(characteristicsSlice.actions.charUpdate({...char, force: +e.target.value}))
  }

  function onChangeSpeed(e: React.ChangeEvent<HTMLInputElement>) {
    const reg = /^\d+$/;
    if (reg.test(e.target.value)) {
      setErrorChars({...errorChars, speed: false})
    } else {
      setErrorChars({...errorChars, speed: true})
    }
    setChars({...chars, speed: e.target.value as unknown as number})
    dispatch(characteristicsSlice.actions.charUpdate({...char, speed: +e.target.value}))
  }

  function resetCurrentChar() {
    setEdit(false);
    dispatch(characteristicsSlice.actions.currentCharUpdate(null));
  }

  return (
    <>
      {edit ? 
      <tr className="characteristics-item">
        <td>
          <input 
            className={errorChars.engineAmperage ? "characteristics-item__input characteristics-item__input_error" : "characteristics-item__input"}
            type='text'
            value={chars.engineAmperage}
            onChange={onChangeEngine}
          />
        </td>
        <td>
          <input 
            className={errorChars.force ? "characteristics-item__input characteristics-item__input_error" : "characteristics-item__input"}
            type='text'
            value={chars.force}
            onChange={onChangeForce}
            />
        </td>
        <td>
          <input 
            className={errorChars.speed ? "characteristics-item__input characteristics-item__input_error" : "characteristics-item__input"}
            type='text'
            value={chars.speed}
            onChange={onChangeSpeed}
          />
        </td>
        <td className="characteristics-item__ok">
          <button 
          className="characteristics-item__button"
          onClick={resetCurrentChar}
          >ok</button>
        </td>
      </tr> 
      : 
      <tr onClick={() => dispatch(characteristicsSlice.actions.currentCharUpdate(index))}>
        <td className={errorChars.engineAmperage ? "characteristics-item__input_error" : ""}>{chars.engineAmperage}</td>
        <td className={errorChars.force ? "characteristics-item__input_error" : ""}>{chars.force}</td>
        <td className={errorChars.speed ? "characteristics-item__input_error" : ""}>{chars.speed}</td>
      </tr>} 
    </>
  );
};

export default CharacteristicsItem;