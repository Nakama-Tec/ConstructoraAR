import './whatsapp.css'

const WhatsAppButton = () => {
  return (
    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25d366",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <img
        src="https://img.icons8.com/fluency/48/whatsapp.png"
        alt="WhatsApp"
        style={{ width: "40px", height: "40px" }}
      />
    </a>
  );
};

export default WhatsAppButton;
