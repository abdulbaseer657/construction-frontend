import React, { useState } from 'react';

// Configuration for the forms based on templates
const templateForms = {
  1: [
    {
      label: "Piping Material",
      type: "select",
      name: "pipingMaterial",
      options: ["PEX", "Copper", "Stainless Steel"],
      defaultValue: "Select Material"
    },
    {
      label: "Spec Section",
      type: "select",
      name: "specSection",
      options: ["1116 Domestic Water (Above Ground)"],
      defaultValue: "1116 Domestic Water (Above Ground)"
    },
    {
      label: "Systems",
      type: "multi-select",
      name: "systems",
      options: ["Domestic Cold Water", "Domestic Hot Water"],
      defaultValue: "Select Systems"
    },
    {
      label: "Notes",
      type: "textarea",
      name: "notes",
      defaultValue: "Add any notes here"
    }
  ],
  2: [
    { label: "Job Title", type: "text", name: "jobTitle", defaultValue: "Enter Job Title" },
    { label: "Company", type: "text", name: "company", defaultValue: "Enter Company Name" }
  ],
  3: [
    { label: "Hobby", type: "text", name: "hobby", defaultValue: "Describe your hobby" },
    { label: "Favorite Music Genre", type: "select", name: "musicGenre", options: ["Jazz", "Rock", "Classical"], defaultValue: "Select Genre" }
  ]
};

// Define default values and dependent fields for each material
const materialDefaults = {
  PEX: {
    pipeGrade: "Grade A",
    color: "Red",
    fittingType: "Compression"
  },
  Copper: {
    color: "Gold",
    type: "Type L",
    fittingType: "Solder",
    jointType: "Welded"
  },
  "Stainless Steel": {
    type: "304",
    schedule: "10S",
    fittingType: "Threaded",
    jointType: "Grooved"
  }
};

// Additional material dependent fields for dynamic rendering
const materialDependentFields = {
  PEX: [
    { label: "Pipe Grade", type: "select", name: "pipeGrade", options: ["Grade A", "Grade B", "Grade C"], defaultValue: "Select Grade" },
    { label: "Color", type: "select", name: "color", options: ["Red", "Blue", "Green"], defaultValue: "Select Color" },
    { label: "Fitting Type", type: "text", name: "fittingType", defaultValue: "Specify Fitting Type" }
  ],
  Copper: [
    { label: "Color", type: "select", name: "color", options: ["Gold", "Rose", "Bronze"], defaultValue: "Select Color" },
    { label: "Type", type: "select", name: "type", options: ["Type L", "Type M", "Type K"], defaultValue: "Select Type" },
    { label: "Fitting Type", type: "text", name: "fittingType", defaultValue: "Specify Fitting Type" },
    { label: "Joint Type", type: "text", name: "jointType", defaultValue: "Specify Joint Type" }
  ],
  "Stainless Steel": [
    { label: "Type", type: "select", name: "type", options: ["304", "316"], defaultValue: "Select Type" },
    { label: "Schedule", type: "select", name: "schedule", options: ["5S", "10S", "40S"], defaultValue: "Select Schedule" },
    { label: "Fitting Type", type: "text", name: "fittingType", defaultValue: "Specify Fitting Type" },
    { label: "Joint Type", type: "text", name: "jointType", defaultValue: "Specify Joint Type" }
  ]
};



// Remaining materialDefaults and materialDependentFields remain unchanged


function FormComponent() {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentMaterial, setCurrentMaterial] = useState('');

  const handleTemplateSelection = (templateId) => {
    setSelectedTemplates(
      selectedTemplates.includes(templateId)
        ? selectedTemplates.filter(t => t !== templateId)
        : [...selectedTemplates, templateId]
    );
  };

  const handleInputChange = (e, field, templateId) => {
    const value = e.target.type === 'select-multiple' ? Array.from(e.target.selectedOptions, option => option.value) : e.target.value;
    const newFormData = { ...formData, [`${templateId}_${field}`]: value };

    // Automatically set other fields when piping material is selected
    if (field === "pipingMaterial") {
      setCurrentMaterial(e.target.value);
      const defaults = materialDefaults[e.target.value] || {};
      Object.keys(defaults).forEach(key => {
        newFormData[`${templateId}_${key}`] = defaults[key];
      });
    }

    setFormData(newFormData);
  };

  const renderField = (field, templateId) => {
    const fieldName = `${templateId}_${field.name}`;
    let inputElement = null;

    switch (field.type) {
      case 'select':
        inputElement = (
          <select
            name={fieldName}
            value={formData[fieldName] || ''}
            onChange={(e) => handleInputChange(e, field.name, templateId)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option disabled value="">{field.defaultValue}</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
        break;
      case 'multi-select':
        inputElement = (
          <select
            multiple
            name={fieldName}
            value={formData[fieldName] || []}
            onChange={(e) => handleInputChange(e, field.name, templateId)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
        break;
      case 'textarea':
        inputElement = (
          <textarea
            name={fieldName}
            placeholder={field.defaultValue}
            value={formData[fieldName] || ''}
            onChange={(e) => handleInputChange(e, field.name, templateId)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
        break;
      default:
        inputElement = (
          <input
            type="text"
            name={fieldName}
            placeholder={field.defaultValue}
            value={formData[fieldName] || ''}
            onChange={(e) => handleInputChange(e, field.name, templateId)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
        break;
    }

    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
        {inputElement}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = {};
  
    // Loop through each selected template
    selectedTemplates.forEach((templateId) => {
      const templateData = {};
  
      // Loop through each field in the template form
      templateForms[templateId].forEach(field => {
        const fieldName = `${templateId}_${field.name}`;
        templateData[field.name] = formData[fieldName] || (field.type === 'multi-select' ? [] : '');
      });
  
      // If Template 1 is selected, include additional material-dependent fields
      if (templateId === 1 && currentMaterial) {
        materialDependentFields[currentMaterial].forEach(field => {
          templateData[field.name] = formData[`${templateId}_${field.name}`] || (field.type === 'multi-select' ? [] : '');
        });
      }
  
      // Assign template data to the output object
      output[`Template ${templateId}`] = templateData;
    });
  
    console.log('Form Data:', output);
  };
  
  

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        {[1, 2, 3].map((templateId) => (
          <button
            key={templateId}
            className={`text-lg px-4 py-2 rounded ${selectedTemplates.includes(templateId) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleTemplateSelection(templateId)}
          >
             Template {templateId}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {selectedTemplates.sort().map((templateId) => (
          <div key={templateId} className="mb-6">
            <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Template {templateId} Form:</h3>
            {templateForms[templateId].map(field => renderField(field, templateId))}
            {templateId === 1 && currentMaterial && materialDependentFields[currentMaterial].map(field => renderField(field, templateId))}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
