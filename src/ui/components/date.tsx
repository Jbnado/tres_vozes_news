export default function DateComponent({ date }: { date: string }) {
  return (
    <span>
      {new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}
    </span>
  );
}
