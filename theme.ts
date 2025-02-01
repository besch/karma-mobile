export const Colors = {
  primary: '#4caf50',
  secondary: '#ffa726',
  accent: '#ff9800',
  background: '#ffffff',
  text: '#333333',
};

export const Typography = {
  header: { fontSize: 24, fontWeight: 'bold' as const, color: Colors.text },
  title: { fontSize: 20, fontWeight: 'bold' as const, color: Colors.text },
  body: { fontSize: 16, color: Colors.text },
}; 