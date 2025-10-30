export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-white pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#111111] mb-6">
          <span className="text-[#ee2825]">Contatti</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Prenota la tua lezione di sci a Limone Piemonte.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Info Point</h3>
            <p className="text-gray-600">Via Roma 5, Limone Piemonte</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Telefono</h3>
            <p className="text-gray-600">+39 0171 928167</p>
          </div>
        </div>
      </div>
    </div>
  );
}