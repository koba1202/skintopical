import { useTreatmentPlanStore } from '@/stores/treatmentPlanStore';
import { startOfDay, format } from 'date-fns';
import { ja } from 'date-fns/locale';

const HomeScreen = () => {
  const today = new Date();
  const { plans, activePlanId } = useTreatmentPlanStore();

  return (
    <div>
      <h2>{format(today, 'M月d日（E）', {locale: ja})}</h2>
      <p>プラン名 - フェーズ名</p>

      <div>
        <h3>タイミング（例：朝）</h3>
        <ul>
          <li>
            <span>部位（顔）</span>
            <button type="button">塗布した</button>
          </li>
          <li>
            <span>部位（首）</span>
            <button type="button">塗布した</button>
          </li>
        </ul>
      </div>

      <div>
        <h3>タイミング（例：朝）</h3>
        <ul>
          <li>
            <span>部位（顔）</span>
            <button type="button">塗布した</button>
          </li>
          <li>
            <span>部位（首）</span>
            <button type="button">塗布した</button>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default HomeScreen;
