/**
 * Utility function to submit form data to HubSpot via AJAX
 */

// Track form submissions to prevent duplicates
const submissionTracker = new Set<string>()

export async function submitToHubSpot(
  formData: FormData,
  portalId: string,
  formId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Create a unique submission ID based on form data and timestamp
    const formEntries = Array.from(formData.entries())
      .map(([key, value]) => `${key}:${value}`)
      .join("|")
    const submissionId = `${formId}-${formEntries}-${Date.now()}`

    // Check if this is a duplicate submission (within last 2 seconds)
    if (submissionTracker.has(submissionId.split("-").slice(0, -1).join("-"))) {
      console.log("Preventing duplicate submission")
      return {
        success: true,
        message: "Formulário enviado com sucesso! Entraremos em contato em breve.",
      }
    }

    // Add to tracker and remove after 2 seconds to prevent duplicates
    submissionTracker.add(submissionId.split("-").slice(0, -1).join("-"))
    setTimeout(() => {
      submissionTracker.delete(submissionId.split("-").slice(0, -1).join("-"))
    }, 2000)

    // Convert FormData to an object for HubSpot
    const formFields: { name: string; value: string }[] = []
    formData.forEach((value, name) => {
      // Skip any internal tracking fields
      if (!name.startsWith("_")) {
        formFields.push({ name, value: value.toString() })
      }
    })

    // Add context information
    const context = {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
      // Add a unique identifier to help track duplicate submissions
      submissionId: submissionId,
    }

    // Prepare the payload for HubSpot API
    const payload = {
      fields: formFields,
      context,
      // Add skipValidation to prevent HubSpot from validating the form twice
      skipValidation: true,
    }

    console.log("Submitting to HubSpot:", formId)

    // Submit to HubSpot API
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("HubSpot submission error:", data)
      return {
        success: false,
        message: data.message || "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      }
    }

    return {
      success: true,
      message: "Formulário enviado com sucesso! Entraremos em contato em breve.",
    }
  } catch (error) {
    console.error("Error submitting to HubSpot:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
    }
  }
}
