var React = require('react');
var Dropdown = require('react-dropdown');

var SpecialtySelect = React.createClass({
  getInitialState: function() {
    return {
      defaultSpecialty: this.props.defaultSpecialty,
      defaultSpecialtySlug: this.props.defaultSpecialtySlug,
      selected: {value: 'Choose Specialty', label: 'Choose Specialty *', slug: ''}
    }
  },
  sendSpecialty: function(option) {
    this.props.sendSpecialty(option.label, option.slug);
    this.setState({selected: option})
  },
  componentDidMount: function() {
    if (this.state.defaultSpecialty) {
      this.setState({ selected: { value: this.state.defaultSpecialty, label: this.state.defaultSpecialty, slug: this.state.defaultSpecialtySlug }})
    }
  },
  render: function() {
    var options = [
      {
        type: 'group', name: 'Popular Specialties', items: [
          { value: 'Primary Care Doctor', label: 'Primary Care Doctor', slug: 'primary-care-doctor' },
          { value: 'OB-GYN (Obstetrician-Gynecologist)', label: 'OB-GYN (Obstetrician-Gynecologist)', slug: 'ob-gyn' },
          { value: 'Ear, Nose & Throat Doctor (ENT)', label: 'Ear, Nose & Throat Doctor (ENT)', slug: 'ent' },
          { value: 'Dentist', label: 'Dentist', slug: 'dentist' },
          { value: 'Eye Doctor', label: 'Eye Doctor', slug: 'eye-doctor' },
        ]
    },
      {
        type: 'group', name: 'All Specialties', items: [
          { value: 'Acupuncturist', label: 'Acupuncturist', slug: 'acupuncturist' },
          { value: 'Allergist (Immunologist)', label: 'Allergist (Immunologist)', slug: 'allergist' },
          { value: 'Cardiologist (Heart Doctor)', label: 'Cardiologist (Heart Doctor)', slug: 'cardiologist' },
          { value: 'Cardiothoracic Surgeon', label: 'Cardiothoracic Surgeon', slug: 'cardiologist' },
          { value: 'Chiropractor', label: 'Chiropractor', slug: 'chiropractor' },
          { value: 'Dentist', label: 'Dentist', slug: 'dentist' },
          { value: 'Dermatologist', label: 'Dermatologist', slug: 'dermatologist' },
          { value: 'Dietitian / Nutritionist', label: 'Dietitian / Nutritionist', slug: 'nutritionist' },
          { value: 'Ear, Nose & Throat Doctor (ENT)', label: 'Ear, Nose & Throat Doctor (ENT)', slug: 'ent' },
          { value: 'Endocrinologist (incl Diabetes Specialists)', label: 'Endocrinologist (incl Diabetes Specialists)', slug: 'endocrinologist' },
          { value: 'Eye Doctor', label: 'Eye Doctor', slug: 'eye-doctor' },
          { value: 'Gastroenterologist', label: 'Gastroenterologist', slug: 'gastroenterologist' },
          { value: 'Hearing Specialist', label: 'Hearing Specialist', slug: 'hearing-specialist' },
          { value: 'Hematologist (Blood Specialist)', label: 'Hematologist (Blood Specialist)', slug: 'hematologist' },
          { value: 'Infectious Disease Specialist', label: 'Infectious Disease Specialist', slug: 'infectious-disease-specialist' },
          { value: 'Infertility Specialist', label: 'Infertility Specialist', slug: 'infertility-specialist' },
          { value: 'Midwife', label: 'Midwife', slug: 'midwife' },
          { value: 'Naturopathic Doctor', label: 'Naturopathic Doctor', slug: 'naturopathic-doctor' },
          { value: 'Nephrologist (Kidney Specialist)', label: 'Nephrologist (Kidney Specialist)', slug: 'nephrologist' },
          { value: 'Neurologist (incl Headache Specialists)', label: 'Neurologist (incl Headache Specialists)', slug: 'neurologist' },
          { value: 'Neurosurgeon', label: 'Neurosurgeon', slug: 'neurologist' },
          { value: 'OB-GYN (Obstetrician-Gynecologist)', label: 'OB-GYN (Obstetrician-Gynecologist)', slug: 'ob-gyn' },
          { value: 'Oncologist', label: 'Oncologist', slug: 'oncologist' },
          { value: 'Ophthalmologist', label: 'Ophthalmologist', slug: 'eye-doctor' },
          { value: 'Optometrist', label: 'Optometrist', slug: 'eye-doctor' },
          { value: 'Orthodontist', label: 'Orthodontist', slug: 'dentist' },
          { value: 'Orthopedic Surgeon (Orthopedist)', label: 'Orthopedic Surgeon (Orthopedist)', slug: 'orthopedist' },
          { value: 'Pain Management Specialist', label: 'Pain Management Specialist', slug: 'pain-management-specialist' },
          { value: 'Pediatric Dentist', label: 'Pediatric Dentist', slug: 'dentist' },
          { value: 'Pediatrician', label: 'Pediatrician', slug: 'pediatrician' },
          { value: 'Physiatrist (Physical Medicine)', label: 'Physiatrist (Physical Medicine)', slug: 'physical-therapist' },
          { value: 'Physical Therapist', label: 'Physical Therapist', slug: 'physical-therapist' },
          { value: 'Plastic Surgeon', label: 'Plastic Surgeon', slug: 'plastic-surgeon' },
          { value: 'Podiatrist (Foot and Ankle Specialist)', label: 'Podiatrist (Foot and Ankle Specialist)', slug: 'podiatrist' },
          { value: 'Primary Care Doctor', label: 'Primary Care Doctor', slug: 'primary-care-doctor' },
          { value: 'Prosthodontist', label: 'Prosthodontist', slug: 'dentist' },
          { value: 'Psychiatrist', label: 'Psychiatrist', slug: 'therapist' },
          { value: 'Psychologist', label: 'Psychologist', slug: 'therapist' },
          { value: 'Pulmonologist (Lung Doctor)', label: 'Pulmonologist (Lung Doctor)', slug: 'pulmonologist' },
          { value: 'Radiologist', label: 'Radiologist', slug: 'radiologist' },
          { value: 'Rheumatologist', label: 'Rheumatologist', slug: 'rheumatologist' },
          { value: 'Sleep Medicine Specialist', label: 'Sleep Medicine Specialist', slug: 'sleep-medicine-specialist' },
          { value: 'Sports Medicine Specialist', label: 'Sports Medicine Specialist', slug: 'sports-medicine-specialist' },
          { value: 'Surgeon', label: 'Surgeon', slug: 'surgeon' },
          { value: 'Therapist / Counselor', label: 'Therapist / Counselor', slug: 'therapist' },
          { value: 'Urgent Care Doctor', label: 'Urgent Care Doctor', slug: 'urgent-care-doctor' },
          { value: 'Urological Surgeon', label: 'Urological Surgeon', slug: 'urologist' },
          { value: 'Urologist', label: 'Urologist', slug: 'urologist' },
          { value: 'Vascular Surgeon', label: 'Vascular Surgeon', slug: 'vascular-surgeon' }
        ]
      }
    ]

    var defaultOption = this.state.selected;

    return (
      <Dropdown options={options} onChange={this.sendSpecialty} value={defaultOption} />
    )
  }
});

module.exports = SpecialtySelect;
