import React from "react";
import { Panel } from "rsuite";

function AnuncioButton({ imageUrl, descricao, onClick }) {
    return (
        <Panel
            bordered
            className="anuncio-button"
            style={{
                width: "400px",
                cursor: "pointer",
                transition: "transform 0.2s",
            }}
            onClick={onClick}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={imageUrl}
                    alt="Imagem do anúncio"
                    style={{
                        maxWidth: "100px",
                        height: "auto",
                        marginRight: "20px",
                        borderRadius: "5px",
                    }}
                />
                <p style={{ margin: 0 }}>{descricao}</p>
            </div>
        </Panel>
    );
}

export default AnuncioButton;
