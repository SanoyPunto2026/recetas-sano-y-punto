"use client";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <div style={{padding: '50px', background: 'white', color: 'red'}}>
      <h1>¡Error detectado en Produccion!</h1>
      <pre style={{whiteSpace: 'pre-wrap', border: '1px solid red', padding: '10px'}}>{error.message}</pre>
      <button onClick={() => reset()} style={{marginTop: '20px', padding: '10px', background: 'red', color: 'white'}}>Intentar de nuevo</button>
    </div>
  );
}
