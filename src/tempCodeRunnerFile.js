
 const safeParams = { genero: "Feminino", faixaEtaria: "18 a 24 anos", profissao: "Saúde e Bem-estar", motivoBusca: "Sinto que é o momento de iniciar uma nova fase", areaVida: "Relacionamentos e amor-próprio", experienciaTerapias: "Sim, já faço ou já fiz acompanhamentos", expectativa: "Mais clareza e autoconhecimento", comoConheceu: "YouTube, evento ou pesquisa na internet" }

  // Mantém as chaves originais em camelCase (para bater com o GA4)
  // e limita APENAS os valores das respostas em 40 caracteres
  const sanitizedParams = Object.entries(safeParams).reduce((acc, [key, value]) => {
    const cleanValue = typeof value === 'string' 
      ? value.trim().substring(0, 40) 
      : value

    acc[key] = cleanValue
    return acc
  }, {})

  console.log(sanitizedParams)