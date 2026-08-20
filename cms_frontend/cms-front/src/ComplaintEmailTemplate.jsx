import React from "react";
import { useNavigate } from "react-router-dom";

function ComplaintEmailTemplate({
    id,
    title,
    status,
    userName,
    phone,
    email,
    location
}) {

    const navigate = useNavigate();

    return (

        <div style={styles.body}>

            <div style={styles.container}>

                <h2 style={styles.title}>
                    New Complaint Raised
                </h2>

                <p>
                    A new complaint has been registered.
                </p>

                <table style={styles.table}>

                    <tbody>

                    <tr>
                        <td style={styles.label}>
                            Complaint ID:
                        </td>

                        <td style={styles.value}>
                            {id}
                        </td>
                    </tr>

                    <tr>
                        <td style={styles.label}>
                            Title:
                        </td>

                        <td style={styles.value}>
                            {title}
                        </td>
                    </tr>

                    <tr>
                        <td style={styles.label}>
                            Status:
                        </td>

                        <td style={styles.value}>
                            {status}
                        </td>
                    </tr>

                    <tr>
                        <td style={styles.label}>
                            User:
                        </td>

                        <td style={styles.value}>
                            {userName}
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.label}>
                            Phone:
                        </td>

                        <td style={styles.value}>
                            {phone}
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.label}>
                            Email:
                        </td>

                        <td style={styles.value}>
                            {email}
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.label}>
                            Location:
                        </td>

                        <td style={styles.value}>
                            {location}
                        </td>
                    </tr>

                    </tbody>

                </table>

                <br />

                 <div>
            
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/admin");
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              View Complaint
            </button>
          </div>

            </div>

        </div>
    );
}

const styles = {

    body: {
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        minHeight: "100vh"
    },

    container: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },

    title: {
        color: "#d32f2f",
        marginBottom: "20px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    label: {
        fontWeight: "bold",
        padding: "10px",
        width: "150px"
    },

    value: {
        padding: "10px"
    },

    button: {
        display: "inline-block",
        backgroundColor: "#1976d2",
        color: "white",
        padding: "12px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        marginTop: "20px"
    }
};

export default ComplaintEmailTemplate;