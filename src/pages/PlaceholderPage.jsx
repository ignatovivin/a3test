export function PlaceholderPage({ title, description }) {
  return (
    <section className="cabinet-placeholder">
      <h2 className="cabinet-placeholder__title">{title}</h2>
      <p className="cabinet-placeholder__subtitle">{description}</p>
    </section>
  )
}
