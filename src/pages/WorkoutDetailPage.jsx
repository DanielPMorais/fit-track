import React from 'react';
import { useParams, Link } from 'react-router-dom';

export function WorkoutDetailPage() {
  // o hook useParams nos permite acessar os parâmetros da URL (ID do treino)
  const { workoutId } = useParams();

  return (
    <div>
      <h2>Detalhes do Treino</h2>
      <p>Você está visualizando o treino com ID: <strong>{workoutId}</strong></p>
      <p>(Página em construção...)</p>
      <br />
      <Link to="/treinos">Voltar para a lista de treinos</Link>
    </div>
  );
}