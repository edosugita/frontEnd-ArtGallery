import style from '@/styles/Detailbid.module.css'

export default function HistoryBid() {
  return (
    <>
        <table className={`table ${style.table}`}>
            <thead>
                <tr>
                    <th scope="col">Usename</th>
                    <th scope="col">Bid</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Form in Space &#128081;</th>
                    <td>Rp 200.000</td>
                </tr>
                <tr>
                    <th scope="row">Harmony in Chaos</th>
                    <td>Rp 200.000</td>
                </tr>
                <tr>
                    <th scope="row">Spectrum of Emotions</th>
                    <td>Rp 200.000</td>
                </tr>
                <tr>
                    <th scope="row">Abstraction of Energy</th>
                    <td>Rp 200.000</td>
                </tr>
                <tr>
                    <th scope="row">Power of Colors</th>
                    <td>Rp 200.000</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}
