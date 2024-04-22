import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrain } from '../../types/ITrain';

interface TrainItemProps {
  train: ITrain;
  id: number;
}

const TrainItem: FC<TrainItemProps> = ({ train, id }) => {
  const router = useNavigate();

  return (
    <tr onClick={() => router(`/trains/${id}`)}>
      <td>{train.name}</td>
      <td>{train.description}</td>
    </tr>
  );
};

export default TrainItem;