import { FC } from "react";
import TrainItem from "../TrainItem/TrainItem";
import './TrainList.css';
import { ITrain } from "../../types/ITrain";

interface TrainListProps {
  trains: ITrain[];
}

const TrainList: FC<TrainListProps> = ({ trains }) => {
  return (
    <div className='train-list'>
      <h2 className='train-list__title'>Поезда</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => 
            <TrainItem train={train} id={index} key={index} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainList;