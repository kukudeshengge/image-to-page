const PageTitle = ({ route }) => {
  const { title, element } = route
  document.title = title
  return <>{element}</>
}

export default PageTitle
