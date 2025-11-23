import React, { useState } from 'react';

// --- Simple Icon Components (Embedded to avoid external dependencies) ---
const AmbulanceIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 10H6" /><path d="M14 18h6" /><path d="M18 8v13" /><path d="M8 8v13" /><path d="M3 18h18v-8a2 2 0 0 0-2-2h-2.5a2 2 0 0 1-1.6-.8l-1.3-2.6A2 2 0 0 0 11.8 3H8a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v8Z" /><path d="M12 10h4" /><path d="M8 10h4" /><path d="M16 10h4" /></svg>
);
const MapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" /></svg>
);
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const ActivityIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);

export default function MedRouteLanding() {
  // Form State
  const [formData, setFormData] = useState({
    org: '',
    contact: '',
    email: '',
    phone: '',
    city: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  // Validation Logic
  const validate = () => {
    let tempErrors = {};
    if (!formData.org) tempErrors.org = "Organization name is required";
    if (!formData.contact) tempErrors.contact = "Contact person is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.medroute.example/pilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ org: '', contact: '', email: '', phone: '', city: '', notes: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error("API Error:", error);
      // Note: In a real scenario, you might want to handle network errors specifically
      setSubmitStatus('error'); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AmbulanceIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold tracking-tight text-slate-800">MedRoute</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-red-600 transition">How it Works</a>
            <a href="#live-map" className="hover:text-red-600 transition">Live Coverage</a>
            <a href="#partners" className="hover:text-red-600 transition">Partners</a>
          </nav>
          <a 
            href="#pilot-signup"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Join Pilot
          </a>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Smarter Routing for</span>{' '}
                  <span className="block text-red-600 xl:inline">Critical Care</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  MedRoute connects ambulances, hospitals, and traffic management systems to reduce response times by up to 30% in pilot cities. 
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#pilot-signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10">
                      Start City Pilot
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#live-map" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10">
                      View Live Map
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 flex items-center justify-center">
             {/* Placeholder for Hero Image */}
             <div className="text-gray-400 text-center">
                <ActivityIcon className="h-32 w-32 mx-auto mb-4 opacity-50" />
                <p>Real-time Analytics Dashboard Preview</p>
             </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Workflow</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Orchestrating Emergency Response
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: '1. Instant Alert', desc: 'Dispatch receives geolocation and severity data instantly.', icon: ActivityIcon },
                { title: '2. Dynamic Routing', desc: 'AI calculates the fastest route considering live traffic & hospital load.', icon: MapIcon },
                { title: '3. Hospital Prep', desc: 'ER teams receive patient vitals before the ambulance arrives.', icon: AmbulanceIcon },
              ].map((item, idx) => (
                <div key={idx} className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE MAP PLACEHOLDER --- */}
      <section id="live-map" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Live Coverage Network</h2>
            <p className="mt-2 text-gray-500">Real-time tracking of active units and hospital capacity.</p>
          </div>
          
          {/* IMPLEMENTATION NOTE: 
             1. Replace the div below with your Map Container (Google Maps React / Mapbox GL JS).
             2. Use WebSocket or Server-Sent Events (SSE) to fetch vehicle coordinates.
             3. Example:
                useEffect(() => {
                   const socket = io('wss://api.medroute.example');
                   socket.on('location_update', updateMarker);
                   return () => socket.disconnect();
                }, []);
          */}
          <div className="relative w-full h-96 bg-slate-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <MapIcon className="h-16 w-16 mx-auto text-slate-400 mb-2" />
              <p className="text-slate-500 font-medium">Interactive Map Module Loading...</p>
              <span className="text-xs text-slate-400 block mt-2">
                (API Key Required: Google Maps / Mapbox)
              </span>
            </div>
            
            {/* Fake UI Overlay for "Live" feel */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded shadow text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-bold">System Online</span>
              </div>
              <div className="text-gray-600">Updates: Real-time</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS / HOSPITAL & AMBULANCE SECTION --- */}
      <section id="partners" className="bg-slate-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Integrated Care Network</h2>
              <p className="text-slate-300 mb-6">
                Our pilot infrastructure seamlessly connects private and public emergency resources into a single command view.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <span>Auto-divert protocols for full ERs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <span>Telemetry data integration (HL7/FHIR)</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <span className="block text-4xl font-bold text-red-500">12</span>
                <span className="text-sm text-slate-400">Partner Hospitals</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <span className="block text-4xl font-bold text-red-500">45+</span>
                <span className="text-sm text-slate-400">Active Ambulances</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <span className="block text-4xl font-bold text-red-500">8min</span>
                <span className="text-sm text-slate-400">Avg Response Time</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <span className="block text-4xl font-bold text-red-500">99%</span>
                <span className="text-sm text-slate-400">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PILOT SIGNUP FORM --- */}
      <section id="pilot-signup" className="py-16 bg-red-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Deploy MedRoute in Your City</h2>
              <p className="mt-2 text-gray-600">Fill out the form to schedule a technical demo and pilot assessment.</p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-green-900">Request Received!</h3>
                <p className="text-green-700 mt-2">We have received your pilot application. Our implementation team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-800"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="org" className="block text-sm font-medium text-gray-700">Organization / Municipality Name <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="org"
                        id="org"
                        value={formData.org}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm p-3 border ${errors.org ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                      />
                      {errors.org && <p className="mt-1 text-sm text-red-600">{errors.org}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Name <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm p-3 border ${errors.contact ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                      />
                      {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm p-3 border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm p-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Target Pilot City <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm p-3 border ${errors.city ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Requirements</label>
                    <div className="mt-1">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-red-500 focus:ring-red-500 sm:text-sm border"
                      />
                    </div>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                    There was an error submitting your request. Please try again.
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Pilot Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="text-gray-400 hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="text-gray-400 hover:text-gray-300 cursor-pointer">API Documentation</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2023 MedRoute Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
