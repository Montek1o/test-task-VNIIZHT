import { FC, useEffect } from 'react';
import './CharacteristicsList.css';
import { useParams } from 'react-router-dom';
import { ITrain } from '../../types/ITrain';
import CharacteristicsItem from '../CharacteristicsItem/CharacteristicsItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { trainSlice } from '../../store/reducers/TrainSlice';
import { characteristicsSlice } from '../../store/reducers/CharSlice';

interface CharacteristicsListProp {
  trains: ITrain[];
}

const CharacteristicsList: FC<CharacteristicsListProp> = ({ trains }) => {
  const dispatch = useAppDispatch();
  const { validation, chars } = useAppSelector(state => state.charReducer);
  const params = useParams();
  const index = Number(params.id);
  const train: ITrain = trains[index];

  useEffect(() => {
    dispatch(trainSlice.actions.currentTrainUpdate(index));
    if (train) dispatch(characteristicsSlice.actions.getChars(train.characteristics));

    return () => {
      dispatch(characteristicsSlice.actions.currentCharUpdate(null))
    }
  }, [train])

  function submitData() {
    dispatch(trainSlice.actions.trainsUpdateData(chars));
    const speedArr: number[] = [];
    chars.forEach(char => {
      speedArr.push(char.speed);
    })
    speedArr.sort((a,b) => a - b).forEach((speed) => {
      console.log(speed);
    })
  }

  if (train) {
    return (
    <div className='characteristics'>
      <div className='characteristics-list'>
        <h2 className='characteristics-list__title'>Характеристики<br/>{train.name}</h2>
        <table>
          <thead>
            <tr>
              <th>Ток двигателя</th>
              <th>Сила тяги</th>
              <th>Скорость</th>
            </tr>
          </thead>
          <tbody>
            {train.characteristics.map((char, i) => 
              <CharacteristicsItem char={char} index={i} key={`${params.id}.${i}`}/>
            )}
          </tbody>
        </table>
      </div>
      <button 
        onClick={submitData}
        disabled={validation ? false : true}
        className={validation ? 'characteristics-submit' : 'characteristics-submit characteristics-submit_inactive'}
      >Отправить данные</button>
    </div>)
  } else {
    return <div>Поезд №{params.id} не существует, выберите поезд из списка</div>
  }
};

export default CharacteristicsList;