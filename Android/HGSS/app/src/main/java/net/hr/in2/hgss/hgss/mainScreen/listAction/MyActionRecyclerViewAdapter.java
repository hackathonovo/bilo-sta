package net.hr.in2.hgss.hgss.mainScreen.listAction;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.Gson;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.model.Action;

import java.util.List;

public class MyActionRecyclerViewAdapter extends RecyclerView.Adapter<MyActionRecyclerViewAdapter.ViewHolder> {

    private final List<Action> mValues;

    public MyActionRecyclerViewAdapter(List<Action> items) {
        mValues = items;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_action, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mTitleView.setText(mValues.get(position).getTitle());
        if(mValues.get(position).getDatumFinish() == null){
            holder.mProgressView.setText(holder.mView.getContext().getString(R.string.left_progress)+" DA");
        }else{
            holder.mProgressView.setText(holder.mView.getContext().getString(R.string.left_progress)+" NE");
        }
        Gson gson = new Gson();
        holder.mDetailsView.setText(gson.toJson(mValues.get(position)));

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(holder.mView.getContext(), ActionActivity.class);
                intent.putExtra("action", holder.mDetailsView.getText().toString());
                holder.mView.getContext().startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mTitleView;
        public final TextView mProgressView;
        public final TextView mDetailsView;
        public Action mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mTitleView = (TextView) view.findViewById(R.id.action_title_tv);
            mProgressView = (TextView) view.findViewById(R.id.action_in_progress_tv);
            mDetailsView = (TextView) view.findViewById(R.id.action_details_tv);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mTitleView.getText() + "'";
        }
    }
}
