/**
 * Utility function to submit form data to HubSpot via AJAX
 */
export async function submitToHubSpot(
  formData: FormData,
  portalId: string,
  formId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Convert FormData to an object for HubSpot
    const formFields: { name: string; value: string }[] = []
    formData.forEach((value, name) => {
      formFields.push({ name, value: value.toString() })
    })

    // Add context information
    const context = {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
    }

    // Prepare the payload for HubSpot API
    const payload = {
      fields: formFields,
      context,
    }

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
