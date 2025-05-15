// Helper function to handle HubSpot form submission
export const submitToHubSpot = async (formData: FormData, portalId: string, formId: string) => {
  try {
    // Convert FormData to an object
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    // Add context information
    const context = {
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      pageName: document.title,
      ipAddress: "",
    }

    // Prepare the payload
    const payload = {
      ...data,
      hs_context: JSON.stringify(context),
    }

    // Submit to HubSpot
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: Object.entries(payload).map(([name, value]) => ({ name, value })),
        context,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit form")
    }

    return await response.json()
  } catch (error) {
    console.error("Error submitting form to HubSpot:", error)
    throw error
  }
}
