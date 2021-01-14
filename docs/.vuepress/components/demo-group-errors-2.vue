<template>
  <FormulateForm
    :errors="{
      'stocks.0.price': 'You’re paying too much for this stock',
      'stocks.2.symbol': 'That stock symbol doesn’t exist.'
    }"
    :values="{
      payment_method: 'mastercard',
      stocks: [
        { symbol: 'AAPL', price: '122.00' },
        { symbol: 'MSFT', price: '13.00' },
        { symbol: 'FXSW', price: '3200.00' }
      ]
    }"
  >
    <FormulateInput
      label="Payment method"
      type="select"
      name="payment_method"
      :options="{
        visa: 'Visa x-4452',
        mastercard: 'Mastercard x-9927'
      }"
    />
    <FormulateInput
      type="group"
      name="stocks"
      label="Enter the names of stocks you want to purchase"
      add-label="+ Add stock"
      :repeatable="true"
    >
      <FormulateInput
        name="symbol"
        label="Stock symbol"
      />
      <FormulateInput
        name="price"
        label="Limit price"
        help="How much are you willing to pay?"
      />
    </FormulateInput>
    <FormulateInput
      type="submit"
      label="Purchase stocks"
    />
  </FormulateForm>
</template>
