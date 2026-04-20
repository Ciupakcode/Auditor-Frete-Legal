import streamlit as st

# --- DADOS OFICIAIS DO DOSSIÊ (DEZ/2023 - ABR/2026) ---
COSTO_BASE_KM = 7663  # Custo de exploração atualizado
LISTA_NEGRA = {
    "TRANSPORTADORA SANTA RITA S.A.": 2136,
    "TRANS GRANOS S.R.L.": 2008,
    "TRANS ITA LOGISTICA": 1211,
    "INTERNACIONAL DELTA": 911
}

st.set_page_config(page_title="Auditor de Frete Legal", page_icon="🚛")

st.title("🚛 Auditor de Frete Legal")
st.subheader("Ferramenta de Fiscalização do Motorista")

# --- ENTRADA DE DADOS ---
with st.expander("📝 Dados da Viagem", expanded=True):
    empresa = st.text_input("Nome da Transportadora").upper()
    dist_gps = st.number_input("Distância Real GPS (KM)", min_value=1)
    dist_papel = st.number_input("Distância na Carta de Flete (KM)", min_value=1)
    peso = st.number_input("Peso da Carga (Toneladas)", min_value=1.0)
    oferta = st.number_input("Valor Oferecido (₲)", min_value=1)

# --- AUDITORIA ---
if st.button("REALIZAR AUDITORIA"):
    # Validação de Empresa
    if empresa in LISTA_NEGRA:
        st.error(f"⚠️ EMPRESA DE ALTO RISCO: {empresa} possui {LISTA_NEGRA[empresa]} infrações registradas.")
    
    # Cálculo de KM Roubado
    km_roubado = dist_gps - dist_papel
    prejuizo_km = km_roubado * COSTO_BASE_KM
    
    # Cálculo de Preço (Decreto 5.791/2021)
    minimo_legal = dist_gps * COSTO_BASE_KM
    
    # Exibição
    st.divider()
    if oferta < minimo_legal:
        st.error(f"🚨 FRETE ILEGAL! O valor mínimo deveria ser ₲ {minimo_legal:,.0f} (Art. 4º)")
    else:
        st.success("✅ Preço dentro do referencial legal.")
        
    if km_roubado > 0:
        st.warning(f"⚠️ KM ROUBADO: Você está perdendo ₲ {prejuizo_km:,.0f}")

    # --- BOTÃO DE DENÚNCIA WHATSAPP ---
    msg = f"Denúncia: Empresa {empresa} pagando abaixo do referencial. Oferecido: {oferta} / Mínimo: {minimo_legal}. KM Roubado: {km_roubado}. Expediente 26000059120B."
    link_wa = f"https://wa.me/595962352235?text={msg.replace(' ', '%20')}"
    st.link_button("📲 DENUNCIAR AGORA (DINATRAN)", link_wa)

st.caption("Baseado no Custo de Exploração de 7.663 ₲/km - Dez/2023")
