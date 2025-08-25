import style from "./controle.module.css"

export const Controle = () => {
    return <>
    <div className={style.divH1}>
            <h1>Controle seus campos de futebol</h1>
    </div>
            <div className={style.controleDosCampos}>
                <div className={style.campos}>
                <h3>O que deseja controlar?</h3>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #1</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #1</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #1</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                </div>
                <button className={style.adicionar}>adicionar</button>
                </div>    
                <div className={style.divSecundaria}>
                    <h3>Horários disponiveis na semana:</h3>
                    <button className={style.visualizar}>Vizualizar</button>
                </div>
                <div className={style.footer}>
                                 <footer className={style.footerHome}>
                <div className={style.footerDiv1}>
                    <h2>ACF</h2>
                </div>
                <div className={style.footerDiv2}>
                    <div className={style.footerDiv3}>
                        <h4>Paginas</h4>
                        <p>Home</p>
                        <p>Agenda</p>
                        <p>Cadastro</p>
                        <p>Login</p>
                    </div>
                    <h4>introdução</h4>
                    <h4>Amostra</h4>
                    <h4>Etapas</h4>
                </div>
            </footer>
                </div>
      
    </>
}