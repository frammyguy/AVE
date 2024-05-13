import React from 'react'
import './navbar.sass'

const Title = (props) => {
  let cl = 'navv_text navv_text_'
  if (props.level === '1') {
    cl += 'head'
  }
  if (props.level === '2') {
    cl += 'sub'
  }
  const ref = '/paper/' + props.click
  return (
    <a href={ref} className={cl}>{props.text}</a>
  )
}

export default function Navbar() {
    return (
      <div className='box navv'>
        <Title level='1' click='1' text='I. Vēsturiskais konteksts'/>
        <Title level='2' click='1' text='A. Krusta karu sākums un iemesli'/>
        <Title level='2' click='2' text='B. Galvenie notikumi un datumi'/>
        <Title level='2' click='3' text='C. Krustakaru ietekme un izplatība pasaulē'/>
        <Title level='1' click='4' text='II. Dalībnieki un konflikti'/>
        <Title level='2' click='4' text='A. Galvenie iesaistītie spēki un organizācijas'/>
        <Title level='2' click='5' text='B. Būtiskākie kaujas un konflikti'/>
        <Title level='2' click='6' text='C. Krustakaru rezultāti un sekas'/>
        <Title level='1' click='7' text='III. Politiskie un reliģiskie aspekti'/>
        <Title level='2' click='7' text='A. Krustakaru politiskā ietekme un pēctecība'/>
        <Title level='2' click='8' text='B. Reliģisko organizāciju loma un atbalsts'/>
        <Title level='2' click='9' text='C. Starptautiskā reakcija uz krustakariem'/>
        <Title level='1' click='10' text='IV. Kultūras sekas'/>
        <Title level='2' click='10' text='A. Sociālās un ekonomiskās pārmaiņas'/>
        <Title level='2' click='11' text='B. Krustakaru ietekme uz kultūru un mākslu'/>
        <Title level='2' click='12' text='C. Mitoloģija un leģendas par krustakariem'/>
      </div>
    )
}