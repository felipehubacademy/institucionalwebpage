# Propriedades Customizadas - HubSpot

Este documento lista as propriedades customizadas que devem ser criadas no HubSpot para o sistema de lembretes funcionar.

## 📋 Propriedades de Deals

Acesse: **HubSpot → Settings → Data Management → Properties → Deals**

---

### 1. `meetup_reminder_d7_sent`

| Campo | Valor |
|-------|-------|
| **Label** | Lembrete D-7 enviado |
| **Property name** | `meetup_reminder_d7_sent` |
| **Type** | Single checkbox |
| **Group** | Deal Information |
| **Description** | Indica se o lembrete D-7 (7 dias antes) foi enviado para este participante |
| **Default value** | `false` |

---

### 2. `meetup_reminder_d3_sent`

| Campo | Valor |
|-------|-------|
| **Label** | Lembrete D-3 enviado |
| **Property name** | `meetup_reminder_d3_sent` |
| **Type** | Single checkbox |
| **Group** | Deal Information |
| **Description** | Indica se o lembrete D-3 (3 dias antes) foi enviado para este participante |
| **Default value** | `false` |

---

### 3. `meetup_reminder_d1_sent`

| Campo | Valor |
|-------|-------|
| **Label** | Lembrete D-1 enviado |
| **Property name** | `meetup_reminder_d1_sent` |
| **Type** | Single checkbox |
| **Group** | Deal Information |
| **Description** | Indica se o lembrete D-1 (1 dia antes) foi enviado para este participante |
| **Default value** | `false` |

---

## 🔧 Como Criar

1. Acesse **Settings** → **Data Management** → **Properties**
2. Selecione **Deal properties**
3. Clique em **Create property**
4. Preencha os campos conforme a tabela acima
5. Clique em **Save**
6. Repita para as 3 propriedades

---

## ✅ Checklist

- [ ] `meetup_reminder_d7_sent` criada
- [ ] `meetup_reminder_d3_sent` criada
- [ ] `meetup_reminder_d1_sent` criada

---

## 🎯 Pipeline e Estágios (Já configurado)

**Pipeline ID:** `802447717`  
**Nome:** MeetUP - Out/25

**Estágios:**
- `1178499143` - Novo Lead (registro inicial)
- `1178499145` - Presença confirmada (envia lembretes)
- Participou
- Iniciou negociação

---

## 📌 Notas

- Essas propriedades são essenciais para o sistema de lembretes automático
- Elas evitam que o mesmo lembrete seja enviado múltiplas vezes
- O sistema verifica essas propriedades antes de enviar cada lembrete

