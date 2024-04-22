import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TrainList from './components/TrainList/TrainList';
import CharacteristicsList from './components/CharacteristicsList/CharacteristicsList';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchTrains } from './store/reducers/ActionCreators';
import Loading from './components/Loading/Loading';
import './App.css';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { trains, isLoading, error } = useAppSelector(state => state.trainReducer);

  useEffect(() => {
    dispatch(fetchTrains());
  }, []);

  if (error) return <div>{error}</div>
  if (isLoading) return <Loading />

  return (
    <BrowserRouter>
      <TrainList trains={trains}/>
      <Routes>
        <Route path='/*' element={<Navigate to='/trains'/>} />
        <Route path='/trains' element={<div></div>}/>
        <Route path='/trains/:id' element={<CharacteristicsList trains={trains}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;