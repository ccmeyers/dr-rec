var React = require('react');
var Dropdown = require('react-dropdown');

var SpecialtySelect = React.createClass({
  sendSpecialty: function(option) {
    this.props.sendSpecialty(option.label);
  },
  render: function() {
    var options = [
      {
        type: 'group', name: 'Popular Specialties', items: [
          { value: 'Primary Care Doctor', label: 'Primary Care Doctor' },
          { value: 'OB-GYN (Obstetrician-Gynecologist)', label: 'OB-GYN (Obstetrician-Gynecologist)' },
          { value: 'Ear, Nose & Throat Doctor (ENT)', label: 'Ear, Nose & Throat Doctor (ENT)' },
          { value: 'Dentist', label: 'Dentist' },
          { value: 'Eye Doctor', label: 'Eye Doctor' },
        ]
      },
      {
        type: 'group', name: 'All Specialties', items: [
          { value: 'Acupuncturist', label: 'Acupuncturist' },
          { value: 'Allergist (Immunologist)', label: 'Allergist (Immunologist)' },
          { value: 'Cardiologist (Heart Doctor)', label: 'Cardiologist (Heart Doctor)' },
          { value: 'Cardiothoracic Surgeon', label: 'Cardiothoracic Surgeon' },
          { value: 'Chiropractor', label: 'Chiropractor' },
          { value: 'Dentist', label: 'Dentist' },
          { value: 'Dermatologist', label: 'Dermatologist' },
          { value: 'Dietitian / Nutritionist', label: 'Dietitian / Nutritionist' },
          { value: 'Ear, Nose & Throat Doctor (ENT)', label: 'Ear, Nose & Throat Doctor (ENT)' },
          { value: 'Endocrinologist (incl Diabetes Specialists)', label: 'Endocrinologist (incl Diabetes Specialists)' },
          { value: 'Eye Doctor', label: 'Eye Doctor' },
          { value: 'Gastroenterologist', label: 'Gastroenterologist' },
          { value: 'Hearing Specialist', label: 'Hearing Specialist' },
          { value: 'Hematologist (Blood Specialist)', label: 'Hematologist (Blood Specialist)' },
          { value: 'Infectious Disease Specialist', label: 'Infectious Disease Specialist' },
          { value: 'Infertility Specialist', label: 'Infertility Specialist' },
          { value: 'Midwife', label: 'Midwife' },
          { value: 'Naturopathic Doctor', label: 'Naturopathic Doctor' },
          { value: 'Nephrologist (Kidney Specialist)', label: 'Nephrologist (Kidney Specialist)' },
          { value: 'Neurologist (incl Headache Specialists)', label: 'Neurologist (incl Headache Specialists)' },
          { value: 'Neurosurgeon', label: 'Neurosurgeon' },
          { value: 'OB-GYN (Obstetrician-Gynecologist)', label: 'OB-GYN (Obstetrician-Gynecologist)' },
          { value: 'Oncologist', label: 'Oncologist' },
          { value: 'Ophthalmologist', label: 'Ophthalmologist' },
          { value: 'Optometrist', label: 'Optometrist' },
          { value: 'Orthodontist', label: 'Orthodontist' },
          { value: 'Orthopedic Surgeon (Orthopedist)', label: 'Orthopedic Surgeon (Orthopedist)' },
          { value: 'Pain Management Specialist', label: 'Pain Management Specialist' },
          { value: 'Pediatric Dentist', label: 'Pediatric Dentist' },
          { value: 'Pediatrician', label: 'Pediatrician' },
          { value: 'Physiatrist (Physical Medicine)', label: 'Physiatrist (Physical Medicine)' },
          { value: 'Physical Therapist', label: 'Physical Therapist' },
          { value: 'Plastic Surgeon', label: 'Plastic Surgeon' },
          { value: 'Podiatrist (Foot and Ankle Specialist)', label: 'Podiatrist (Foot and Ankle Specialist)' },
          { value: 'Primary Care Doctor', label: 'Primary Care Doctor' },
          { value: 'Prosthodontist', label: 'Prosthodontist' },
          { value: 'Psychiatrist', label: 'Psychiatrist' },
          { value: 'Psychologist', label: 'Psychologist' },
          { value: 'Pulmonologist (Lung Doctor)', label: 'Pulmonologist (Lung Doctor)' },
          { value: 'Radiologist', label: 'Radiologist' },
          { value: 'Rheumatologist', label: 'Rheumatologist' },
          { value: 'Sleep Medicine Specialist', label: 'Sleep Medicine Specialist' },
          { value: 'Sports Medicine Specialist', label: 'Sports Medicine Specialist' },
          { value: 'Surgeon', label: 'Surgeon' },
          { value: 'Therapist / Counselor', label: 'Therapist / Counselor' },
          { value: 'Urgent Care Doctor', label: 'Urgent Care Doctor' },
          { value: 'Urological Surgeon', label: 'Urological Surgeon' },
          { value: 'Urologist', label: 'Urologist' },
          { value: 'Vascular Surgeon', label: 'Vascular Surgeon' }
        ]
      }
    ]

    var defaultOption = { value: 'Choose Specialty', label: 'Choose Specialty' };
    return (
      <Dropdown options={options} onChange={this.sendSpecialty} value={defaultOption} />
    )
  }
});

module.exports = SpecialtySelect;

// <select value="Acupuncturist" ref="specialty">
//   <option value="Acupuncturist">Acupuncturist</option>
//   <option value="Allergist (Immunologist)">Allergist (Immunologist)</option>
//   <option value="Cardiologist (Heart Doctor)">Cardiologist (Heart Doctor)</option>
//   <option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</option>
//   <option value="Chiropractor">Chiropractor</option>
//   <option value="Dentist">Dentist</option>
//   <option value="Dermatologist">Dermatologist</option>
//   <option value="Dietitian / Nutritionist">Dietitian / Nutritionist</option>
//   <option value="Ear, Nose & Throat Doctor (ENT)">Ear, Nose & Throat Doctor (ENT)</option>
//   <option value="Endocrinologist (incl Diabetes Specialists)">Endocrinologist (incl Diabetes Specialists)</option>
//   <option value="Eye Doctor">Eye Doctor</option>
//   <option value="Gastroenterologist">Gastroenterologist</option>
//   <option value="Hearing Specialist">Hearing Specialist</option>
//   <option value="Hematologist (Blood Specialist)">Hematologist (Blood Specialist)</option>
//   <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
//   <option value="Infertility Specialist">Infertility Specialist</option>
//   <option value="Midwife">Midwife</option>
//   <option value="Naturopathic Doctor">Naturopathic Doctor</option>
//   <option value="Nephrologist (Kidney Specialist)">Nephrologist (Kidney Specialist)</option>
//   <option value="Neurologist (incl Headache Specialists)">Neurologist (incl Headache Specialists)</option>
//   <option value="Neurosurgeon">Neurosurgeon</option>
//   <option value="OB-GYN (Obstetrician-Gynecologist)">OB-GYN (Obstetrician-Gynecologist)</option>
//   <option value="Oncologist">Oncologist</option>
//   <option value="Ophthalmologist">Ophthalmologist</option>
//   <option value="Optometrist">Optometrist</option>
//   <option value="Orthodontist">Orthodontist</option>
//   <option value="Orthopedic Surgeon (Orthopedist)">Orthopedic Surgeon (Orthopedist)</option>
//   <option value="Pain Management Specialist">Pain Management Specialist</option>
//   <option value="Pediatric Dentist">Pediatric Dentist</option>
//   <option value="Pediatrician">Pediatrician</option>
//   <option value="Physiatrist (Physical Medicine)">Physiatrist (Physical Medicine)</option>
//   <option value="Physical Therapist">Physical Therapist</option>
//   <option value="Plastic Surgeon">Plastic Surgeon</option>
//   <option value="Podiatrist (Foot and Ankle Specialist)">Podiatrist (Foot and Ankle Specialist)</option>
//   <option value="Primary Care Doctor">Primary Care Doctor</option>
//   <option value="Prosthodontist">Prosthodontist</option>
//   <option value="Psychiatrist">Psychiatrist</option>
//   <option value="Psychologist">Psychologist</option>
//   <option value="Pulmonologist (Lung Doctor)">Pulmonologist (Lung Doctor)</option>
//   <option value="Radiologist">Radiologist</option>
//   <option value="Rheumatologist">Rheumatologist</option>
//   <option value="Sleep Medicine Specialist">Sleep Medicine Specialist</option>
//   <option value="Sports Medicine Specialist">Sports Medicine Specialist</option>
//   <option value="Surgeon">Surgeon</option>
//   <option value="Therapist / Counselor">Therapist / Counselor</option>
//   <option value="Urgent Care Doctor">Urgent Care Doctor</option>
//   <option value="Urological Surgeon">Urological Surgeon</option>
//   <option value="Urologist">Urologist</option>
//   <option value="Vascular Surgeon">Vascular Surgeon</option>
// </select>
