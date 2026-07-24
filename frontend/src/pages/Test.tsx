export default function Test() {
  return (
    <div style={{ padding: 50 }}>
      <h1>Test</h1>
      <input
        type="file"
        onChange={(e) => alert(e.target.files?.[0]?.name)}
      />
    </div>
  );
}