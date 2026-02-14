import React from 'react';

const Molecule3D: React.FC = () => {
  return (
    <div className="molecule-container w-64 h-64 relative animate-[float_6s_ease-in-out_infinite]">
      <style>{`
        .atom {
          position: absolute;
          border-radius: 50%;
          transform-style: preserve-3d;
        }
        .atom-center {
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #3E6B7D, #1C1C1C);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px rgba(62, 107, 125, 0.5);
          z-index: 10;
        }
        .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(214, 90, 49, 0.3);
          border-radius: 50%;
          transform-style: preserve-3d;
        }
        .orbit-1 { width: 120px; height: 120px; animation: spin1 4s linear infinite; margin: -60px 0 0 -60px; }
        .orbit-2 { width: 160px; height: 160px; animation: spin2 5s linear infinite; margin: -80px 0 0 -80px; }
        .orbit-3 { width: 200px; height: 200px; animation: spin3 6s linear infinite; margin: -100px 0 0 -100px; }
        
        .electron {
          position: absolute;
          top: -6px;
          left: 50%;
          width: 12px;
          height: 12px;
          background: #D65A31;
          border-radius: 50%;
          margin-left: -6px;
          box-shadow: 0 0 10px #D65A31;
        }

        @keyframes spin1 { from { transform: rotateX(70deg) rotateZ(0deg); } to { transform: rotateX(70deg) rotateZ(360deg); } }
        @keyframes spin2 { from { transform: rotateY(70deg) rotateZ(0deg); } to { transform: rotateY(70deg) rotateZ(360deg); } }
        @keyframes spin3 { from { transform: rotateX(-45deg) rotateY(45deg) rotateZ(0deg); } to { transform: rotateX(-45deg) rotateY(45deg) rotateZ(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
      
      <div className="atom atom-center"></div>
      
      <div className="orbit orbit-1">
        <div className="electron"></div>
      </div>
      <div className="orbit orbit-2">
        <div className="electron"></div>
      </div>
      <div className="orbit orbit-3">
        <div className="electron"></div>
      </div>
    </div>
  );
};

export default Molecule3D;