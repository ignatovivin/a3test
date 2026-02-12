import { useState, useMemo, useEffect } from 'react'
import { AgCharts } from 'ag-charts-react'
import { METRICS, CHART_DATA } from '../../constants/metrics'

export function MetricsChart() {
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [chartError, setChartError] = useState(null)

  // Обновляем метрики с выбранной
  const metrics = useMemo(() => {
    return METRICS.map((metric) => ({
      ...metric,
      isSelected: metric.id === selectedMetric,
    }))
  }, [selectedMetric])

  // Данные для графика
  const chartData = useMemo(() => {
    return CHART_DATA[selectedMetric] || []
  }, [selectedMetric])

  // Конфигурация графика AG Charts (диапазон Y свой для каждой метрики — разные смыслы)
  const chartOptions = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return null
    }

    try {
      const maxValue = Math.max(
        ...chartData.map((d) => Math.max(d.value, d.comparison ?? d.value)),
      )
      const minValue = Math.min(
        ...chartData.map((d) => Math.min(d.value, d.comparison ?? d.value)),
      )
      const range = maxValue - minValue
      const padding = range > 0 ? range * 0.1 : 5
      const yMin = Math.max(0, Math.floor(minValue - padding))
      const yMax = Math.ceil(maxValue + padding)
      const yStep = (yMax - yMin) / 5
      const yTickValues = [
        yMin,
        Math.round(yMin + yStep),
        Math.round(yMin + 2 * yStep),
        Math.round(yMin + 3 * yStep),
        Math.round(yMin + 4 * yStep),
        yMax,
      ]

      const gray90 = '#7C8A9E'
      const chartFontFamily = 'Mont, system-ui, -apple-system, "Segoe UI", sans-serif'
      return {
        data: chartData,
        theme: {
          overrides: {
            common: {
              axes: {
                category: {
                  label: {
                    color: gray90,
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: chartFontFamily,
                  },
                },
                number: {
                  label: {
                    color: gray90,
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: chartFontFamily,
                  },
                },
              },
            },
          },
        },
        series: [
          // Заливка под основной линией (без подписи в легенде)
          {
            type: 'area',
            xKey: 'date',
            yKey: 'value',
            fill: 'rgba(105, 166, 241, 0.16)',
            stroke: 'transparent',
            showInLegend: false,
            highlight: { enabled: false },
            interpolation: { type: 'smooth' },
          },
          // Текущее значение — сплошная синяя
          {
            type: 'line',
            xKey: 'date',
            yKey: 'value',
            title: 'Текущее',
            stroke: '#69A6F1',
            strokeWidth: 2,
            interpolation: { type: 'smooth' },
            marker: {
              fill: '#69A6F1',
              stroke: '#FFFFFF',
              strokeWidth: 2,
              size: 8,
            },
          },
          // Заливка под предыдущим значением (голубая линия)
          {
            type: 'area',
            xKey: 'date',
            yKey: 'comparison',
            fill: 'rgba(155, 200, 255, 0.16)',
            stroke: 'transparent',
            showInLegend: false,
            highlight: { enabled: false },
            interpolation: { type: 'smooth' },
          },
          // Предыдущее значение — голубая пунктирная
          {
            type: 'line',
            xKey: 'date',
            yKey: 'comparison',
            title: 'Предыдущее',
            stroke: '#9BC8FF',
            strokeWidth: 2,
            lineDash: [6, 4],
            interpolation: { type: 'smooth' },
            marker: {
              fill: '#FFFFFF',
              stroke: '#9BC8FF',
              strokeWidth: 2,
              size: 6,
            },
          },
        ],
        axes: {
          x: {
            type: 'category',
            position: 'bottom',
            label: {
              fontFamily: chartFontFamily,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 1.5,
              color: gray90,
            },
            line: {
              stroke: '#EEEEEE',
            },
            gridLine: {
              enabled: false,
            },
          },
          y: {
            type: 'number',
            position: 'left',
            min: yMin,
            max: yMax,
            nice: true,
            interval: {
              values: yTickValues,
            },
            label: {
              fontFamily: chartFontFamily,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 1.5,
              color: gray90,
              formatter: ({ value }) => String(Math.round(value)),
            },
            line: {
              stroke: '#FFFFFF',
            },
            gridLine: {
              style: [
                {
                  stroke: '#EEEEEE',
                  lineDash: [4, 4],
                },
              ],
            },
          },
        },
        legend: {
          enabled: false,
        },
      }
    } catch (error) {
      console.error('Ошибка создания конфигурации графика:', error)
      setChartError(error.message)
      return null
    }
  }, [chartData])

  const handleMetricClick = (metricId) => {
    setSelectedMetric(metricId)
    setChartError(null)
  }

  // Обработка ошибок при рендеринге графика
  useEffect(() => {
    setChartError(null)
  }, [chartOptions])

  return (
    <div className="cabinet-metrics-container">
      <div className="cabinet-metrics-container__header">
        <h3 className="cabinet-metrics-container__title">Ключевые показатели</h3>
      </div>

      <div className="cabinet-metrics-container__metrics">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            type="button"
            className={`cabinet-metrics-container__metric-card ${
              metric.isSelected ? 'cabinet-metrics-container__metric-card--selected' : ''
            }`}
            onClick={() => handleMetricClick(metric.id)}
          >
            <div className="cabinet-metrics-container__metric-content">
              <div className="cabinet-metrics-container__metric-info">
                <span className="cabinet-metrics-container__metric-title">{metric.title}</span>
                <div className="cabinet-metrics-container__metric-value">{metric.value}</div>
                <div className="cabinet-metrics-container__metric-change">{metric.change}</div>
              </div>
              <div className="cabinet-metrics-container__metric-radio">
                <div
                  className={`cabinet-metrics-container__radio-button ${
                    metric.isSelected ? 'cabinet-metrics-container__radio-button--selected' : ''
                  }`}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="cabinet-metrics-container__chart">
        {chartError ? (
          <div style={{ height: '229px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
            Ошибка загрузки графика: {chartError}
          </div>
        ) : chartOptions && chartData && chartData.length > 0 ? (
          <AgCharts options={chartOptions} />
        ) : (
          <div style={{ height: '229px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Нет данных для графика
          </div>
        )}
      </div>
    </div>
  )
}
