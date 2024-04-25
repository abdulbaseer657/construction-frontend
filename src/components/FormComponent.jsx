import React, { useState } from 'react';

// Configuration for the forms based on templates
const templateForms = {
  2: [
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
  1: [
    { label: "Project", type: "text", name: "Project", defaultValue: "Enter Project" },
    { label: "P1 Job Number", type: "text", name: "P1 Job Number", defaultValue: "Enter P1 Job Number" },
    { label: "Architect", type: "text", name: "Architect", defaultValue: "Enter Architect" },
    { label: "M/E Engineer", type: "text", name: "M/E Engineer", defaultValue: "M/E Engineer" },
    { label: "Client", type: "text", name: "Client", defaultValue: "Enter Client" }
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
    { label: "Pipe Grade", type: "select", name: "pipeGrade", options: ["Non-Barrier, ASTM F876, SDR9, Roll", "Non-Barrier, ASTM F876, SDR9, Straight Length", "Oxygen Barrier, ASTM F876, SDR9, Roll","Oxygen Barrier, ASTM F876, SDR9, Straight Length"], defaultValue: "Select Grade" },
    { label: "Color", type: "select", name: "color", options: ["Natural", "Yellow", "Green"], defaultValue: "Select Color" },
    { label: "Fitting Type", type: "select", name: "fittingType", options: ["PEX EP (Engineered Plastic)", "abc", "def"], defaultValue: "Specify Fitting Type" }
  ],
  Copper: [
    { label: "Grade", type: "select", name: "Grade", options: ["Type L", "Type M", "Type K"], defaultValue: "Select Color" },
    // { label: "Color", type: "select", name: "color", options: ["Gold", "Rose", "Bronze"], defaultValue: "Select Color" },
    { label: "Type", type: "select", name: "type", options: ["Hard, Seamless Water Tube, ASTM B88", "Soft, Seamless Water Tube, ASTM B88"], defaultValue: "Select Type" },
    { label: "Fitting Type", type: "select", name: "fittingType", options:  ["Copper Wrot, Pressure with pulled Tees", "Copper Wrot, Pressure", "Copper Wrot, Pressed Joint with Pulled Tees", "Copper Wrot, Pressed Joint"], defaultValue: "Specify Fitting Type" },
    { label: "Joint Type", type: "select", name: "jointType", options:["Soldered", "Silfos"], defaultValue: "Specify Joint Type" }
  ],
  "Stainless Steel": [
    { label: "Grade", type: "select", name: "type", options: ["Non_Barrier", "StraightRoll", "Oxygen Roll", "Oxygen Straight Roll"], defaultValue: "Select Type" },
    { label: "Schedule", type: "select", name: "schedule", options:["Schedule 10", "Standard Weight", "Schedule 40", "Extra Heavy", "Schedule 80"], defaultValue: "Select Schedule" },
    { label: "Fitting Type", type: "select", name: "fittingType", options: ["Schedule 10", "xyz"], defaultValue: "Specify Fitting Type" },
    { label: "Joint Type", type: "select", name: "jointType", options: ["Buttweld", "xyz"], defaultValue: "Specify Joint Type" }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const output = {};
  
    // Prepare data for submission
    selectedTemplates.forEach((templateId) => {
      const templateData = {};
  
      templateForms[templateId].forEach(field => {
        const fieldName = `${templateId}_${field.name}`;
        templateData[field.name] = formData[fieldName] || (field.type === 'multi-select' ? [] : field.defaultValue);
      });
  
      if (templateId === 2 && currentMaterial) {
        materialDependentFields[currentMaterial].forEach(field => {
          templateData[field.name] = formData[`${templateId}_${field.name}`] || (field.type === 'multi-select' ? [] : field.defaultValue);
        });
      }
  
      output[`Template ${templateId}`] = templateData;
    });
  
    console.log('Form Data to Submit:', output);
  
    // Make the POST request
    try {
      const response = await fetch('http://localhost:8000/create-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(output)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log('Success:', responseData);
        alert('Form submitted successfully!');
        window.location.reload();
      } else {
        throw new Error(responseData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const output = {};
  
  //   // Loop through each selected template
  //   selectedTemplates.forEach((templateId) => {
  //     const templateData = {};
  
  //     // Loop through each field in the template form
  //     templateForms[templateId].forEach(field => {
  //       const fieldName = `${templateId}_${field.name}`;
  //       templateData[field.name] = formData[fieldName] || (field.type === 'multi-select' ? [] : '');
  //     });
  
  //     // If Template 1 is selected, include additional material-dependent fields
  //     if (templateId === 1 && currentMaterial) {
  //       materialDependentFields[currentMaterial].forEach(field => {
  //         templateData[field.name] = formData[`${templateId}_${field.name}`] || (field.type === 'multi-select' ? [] : '');
  //       });
  //     }
  
  //     // Assign template data to the output object
  //     output[`Template ${templateId}`] = templateData;
  //   });
  
  //   console.log('Form Data:', output);
  // };
  
  

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
            {templateId === 2 && currentMaterial && materialDependentFields[currentMaterial].map(field => renderField(field, templateId))}
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
