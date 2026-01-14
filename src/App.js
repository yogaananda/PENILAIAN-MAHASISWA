import React, { useState, useCallback } from "react";


const ASPEK_LIST = [
  "aspek_penilaian_1",
  "aspek_penilaian_2",
  "aspek_penilaian_3",
  "aspek_penilaian_4",
];

const MAHASISWA_LIST = Array.from({ length: 10 }, (_, i) => `mahasiswa_${i + 1}`);

const SelectInput = React.memo(({ aspect, student, value, onChange }) => {


  return (
    <select
      value={value}
      onChange={(e) => onChange(aspect, student, parseInt(e.target.value))}
      style={{ width: "100%", padding: "5px" }}
    >
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
});

export default function App() {

  const [scores, setScores] = useState(() => {
    const initialState = {};
    ASPEK_LIST.forEach((aspek) => {
      initialState[aspek] = {};
      MAHASISWA_LIST.forEach((mhs) => {
        initialState[aspek][mhs] = 1;
      });
    });
    return initialState;
  });


  const handleChange = useCallback((aspect, student, newValue) => {
    setScores((prevScores) => ({
      ...prevScores,
      [aspect]: {
        ...prevScores[aspect],
        [student]: newValue,
      },
    }));
  }, []);


  const handleSave = () => {
    const output = JSON.stringify(scores, null, 2);

    console.log(output); 
    alert("Output tercetak di Console (F12)");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Aplikasi Penilaian Mahasiswa</h1>
      
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Mahasiswa</th>
            {ASPEK_LIST.map((aspek, idx) => (
              <th key={aspek}>Aspek Penilaian {idx + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MAHASISWA_LIST.map((student) => (
            <tr key={student}>
              <td style={{ fontWeight: "bold" }}>{student.replace("_", " ")}</td>
              
              {ASPEK_LIST.map((aspect) => (
                <td key={`${aspect}-${student}`}>
                  <SelectInput
                    aspect={aspect}
                    student={student}
                    value={scores[aspect][student]}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button 
          onClick={handleSave}
          style={{ padding: "10px 20px", background: "black", color: "white", cursor: "pointer" }}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
